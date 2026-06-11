import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSubsidies } from '@/lib/api'
import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_EMOJI,
  CATEGORY_LABELS,
  DEFAULT_PAGE_SIZE,
  SITE_NAME,
  SITE_URL,
} from '@/lib/constants'
import { SubsidyList } from '@/components/subsidy/SubsidyList'
import { Pagination } from '@/components/common/Pagination'
import type { SubsidyCategory } from '@/types/subsidy'

export const revalidate = 3600

const VALID_CATEGORIES = Object.keys(CATEGORY_LABELS) as SubsidyCategory[]

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = slug as SubsidyCategory
  const label = CATEGORY_LABELS[category]
  if (!label) return {}

  const url = `${SITE_URL}/categories/${slug}`
  const title = `${label} 지원금·보조금`
  const description = CATEGORY_DESCRIPTIONS[category]

  return {
    title,
    description,
    keywords: [label, '지원금', '보조금', '정부지원', '신청', '혜택'],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      type: 'website',
      locale: 'ko_KR',
    },
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const { page: pageStr } = await searchParams
  const category = slug as SubsidyCategory

  if (!VALID_CATEGORIES.includes(category)) notFound()

  const page = Math.max(1, Number(pageStr ?? 1))
  const label = CATEGORY_LABELS[category]
  const pageUrl = `${SITE_URL}/categories/${slug}`

  const { items: results, total: count } = await getSubsidies({
    category,
    page,
    page_size: DEFAULT_PAGE_SIZE,
  }).catch(() => ({
    items: [] as import('@/types/subsidy').SubsidyListItem[],
    total: 0,
    page: 1,
    page_size: DEFAULT_PAGE_SIZE,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: `${label} 지원금`, item: pageUrl },
    ],
  }

  function buildPageHref(p: number): string {
    return p <= 1 ? `/categories/${slug}` : `/categories/${slug}?page=${p}`
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 브레드크럼 */}
      <nav aria-label="탐색 경로" className="mb-5">
        <ol className="flex items-center gap-1.5 text-xs text-gray-400">
          <li><Link href="/" className="hover:text-gray-700">홈</Link></li>
          <li aria-hidden="true">›</li>
          <li className="font-medium text-gray-600" aria-current="page">{label}</li>
        </ol>
      </nav>

      {/* 페이지 헤더 */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">{CATEGORY_EMOJI[category]}</span>
        <div>
          <h1 className="text-lg font-bold text-gray-900 lg:text-xl">{label} 지원금·보조금</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {CATEGORY_DESCRIPTIONS[category]} &middot; 총 {count.toLocaleString()}건
          </p>
        </div>
      </div>

      {/* 타 카테고리 빠른 이동 */}
      <nav aria-label="카테고리 목록" className="mb-6 hidden lg:block">
        <ul className="flex flex-wrap gap-2">
          {VALID_CATEGORIES.map((cat) => (
            <li key={cat}>
              <Link
                href={`/categories/${cat}`}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  cat === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                }`}
                aria-current={cat === category ? 'page' : undefined}
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <SubsidyList subsidies={results} />

      <Pagination
        currentPage={page}
        totalCount={count}
        pageSize={DEFAULT_PAGE_SIZE}
        buildHref={buildPageHref}
      />
    </div>
  )
}
