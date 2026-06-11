import type { Metadata } from 'next'
import Link from 'next/link'
import { getSubsidies } from '@/lib/api'
import { CATEGORY_DESCRIPTIONS, CATEGORY_EMOJI, CATEGORY_LABELS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants'
import { SubsidyList } from '@/components/subsidy/SubsidyList'
import type { SubsidyCategory } from '@/types/subsidy'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `${SITE_NAME} — 정부 지원금 한눈에`,
  description: SITE_DESCRIPTION,
  keywords: ['정부지원금', '보조금', '국가보조금', '지원금 신청', '청년지원금', '복지급여'],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — 정부 지원금 한눈에`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'ko-KR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/subsidies?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],
}

export default async function HomePage() {
  const { items: activeSubsidies } = await getSubsidies({ status: 'active', page_size: 6 }).catch(
    () => ({
      items: [] as import('@/types/subsidy').SubsidyListItem[],
      total: 0,
      page: 1,
      page_size: 6,
      total_pages: 1,
      has_next: false,
      has_prev: false,
    })
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 히어로 */}
      <section className="bg-gradient-to-b from-primary-600 to-primary-700 px-4 py-14 text-white lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold leading-tight lg:text-4xl">
            나에게 맞는 정부 지원금 찾기
          </h1>
          <p className="mt-3 text-sm text-primary-100 lg:text-base">{SITE_DESCRIPTION}</p>

          <form action="/subsidies" method="get" className="mt-8" role="search">
            <label htmlFor="hero-search" className="sr-only">
              지원금 검색
            </label>
            <div className="flex gap-2">
              <input
                id="hero-search"
                type="search"
                name="q"
                placeholder="청년, 주거, 취업지원금..."
                autoComplete="off"
                className="flex-1 rounded-xl border-0 px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
              <button
                type="submit"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white active:bg-primary-100"
              >
                검색
              </button>
            </div>
          </form>

          <p className="mt-4 text-xs text-primary-200">
            예시: 청년 월세 지원, 소상공인 대출, 육아 수당
          </p>
        </div>
      </section>

      {/* 카테고리 */}
      <section className="px-4 py-8 lg:py-12" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="categories-heading" className="mb-5 text-base font-bold text-gray-900 lg:text-lg">
            카테고리별 보기
          </h2>
          <ul className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {(Object.entries(CATEGORY_LABELS) as [SubsidyCategory, string][]).map(
              ([slug, label]) => (
                <li key={slug}>
                  <Link
                    href={`/categories/${slug}`}
                    className="flex flex-col items-center gap-1.5 rounded-xl bg-white px-2 py-3.5 text-center text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-100 transition hover:text-primary-700 hover:ring-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    title={CATEGORY_DESCRIPTIONS[slug]}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {CATEGORY_EMOJI[slug]}
                    </span>
                    {label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      {/* 신청 가능한 지원금 */}
      <section className="px-4 pb-12 lg:pb-16" aria-labelledby="active-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex items-center justify-between">
            <h2 id="active-heading" className="text-base font-bold text-gray-900 lg:text-lg">
              지금 신청 가능한 지원금
            </h2>
            <Link
              href="/subsidies?status=active"
              className="text-sm font-medium text-primary-600 hover:underline"
            >
              전체 보기 →
            </Link>
          </div>
          <SubsidyList subsidies={activeSubsidies} />

          {activeSubsidies.length === 0 && (
            <div className="rounded-xl bg-gray-50 py-12 text-center">
              <p className="text-sm text-gray-500">잠시 후 다시 시도해 주세요.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
