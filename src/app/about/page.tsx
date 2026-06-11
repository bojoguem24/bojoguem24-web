import type { Metadata } from 'next'
import Link from 'next/link'
import { CATEGORY_LABELS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants'
import type { SubsidyCategory } from '@/types/subsidy'

export const metadata: Metadata = {
  title: `서비스 소개`,
  description: `${SITE_NAME}는 ${SITE_DESCRIPTION}. 청년·노인·장애인·저소득층 등 대상별 맞춤 지원금을 한눈에 확인하세요.`,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `서비스 소개 | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/about`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/about`,
  name: `서비스 소개 | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  url: `${SITE_URL}/about`,
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
  },
}

const FEATURES = [
  {
    icon: '🔍',
    title: '빠른 검색',
    desc: '카테고리, 지역, 신청 대상 필터로 나에게 맞는 지원금을 빠르게 찾을 수 있어요.',
  },
  {
    icon: '📋',
    title: '상세 정보 제공',
    desc: '신청 기간, 지원 금액, 제출 서류까지 한 페이지에서 확인할 수 있어요.',
  },
  {
    icon: '🔔',
    title: '최신 정보 유지',
    desc: '공공 데이터와 정기 동기화로 항상 최신 지원금 정보를 제공합니다.',
  },
  {
    icon: '📱',
    title: '모바일 최적화',
    desc: '스마트폰에서도 편리하게 이용할 수 있도록 모바일 우선으로 설계했어요.',
  },
]

export default function AboutPage() {
  const categoryList = Object.entries(CATEGORY_LABELS) as [SubsidyCategory, string][]

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="탐색 경로" className="mb-6">
        <ol className="flex items-center gap-1.5 text-xs text-gray-400">
          <li><Link href="/" className="hover:text-gray-700">홈</Link></li>
          <li aria-hidden="true">›</li>
          <li className="font-medium text-gray-600" aria-current="page">서비스 소개</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900">{SITE_NAME} 소개</h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{SITE_DESCRIPTION}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        수많은 정부 지원금·보조금 정보를 한 곳에 모아, 복잡한 정부 사이트를 일일이 찾아보지 않아도
        나에게 맞는 혜택을 빠르게 확인할 수 있도록 도와드립니다.
      </p>

      {/* 주요 기능 */}
      <section className="mt-10" aria-labelledby="features-heading">
        <h2 id="features-heading" className="mb-4 text-base font-bold text-gray-900">
          주요 기능
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map(({ icon, title, desc }) => (
            <li key={title} className="rounded-xl bg-gray-50 p-4">
              <p className="mb-2 text-2xl" aria-hidden="true">{icon}</p>
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 지원 카테고리 */}
      <section className="mt-10" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="mb-4 text-base font-bold text-gray-900">
          지원금 카테고리
        </h2>
        <ul className="flex flex-wrap gap-2">
          {categoryList.map(([slug, label]) => (
            <li key={slug}>
              <Link
                href={`/categories/${slug}`}
                className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 데이터 출처 */}
      <section className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-5">
        <h2 className="mb-2 text-sm font-bold text-gray-900">데이터 출처</h2>
        <p className="text-xs leading-relaxed text-gray-500">
          본 서비스의 지원금 정보는 공공 데이터를 기반으로 수집·가공하여 제공합니다. 정확한 신청
          요건 및 지원 내용은 반드시 해당 기관의 공식 안내를 확인하시기 바랍니다.
        </p>
      </section>

      <div className="mt-8">
        <Link href="/subsidies" className="btn-primary">
          지원금 검색하기 →
        </Link>
      </div>
    </div>
  )
}
