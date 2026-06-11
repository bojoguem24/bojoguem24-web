import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getSubsidies } from '@/lib/api'
import { CATEGORY_LABELS, DEFAULT_PAGE_SIZE, SITE_NAME, SITE_URL, TARGET_LABELS } from '@/lib/constants'
import { SubsidyList } from '@/components/subsidy/SubsidyList'
import { SubsidyListSkeleton } from '@/components/common/LoadingSkeleton'
import { SearchFilterForm } from '@/components/search/SearchFilterForm'
import { MobileFilterSheet } from '@/components/search/MobileFilterSheet'
import { Pagination } from '@/components/common/Pagination'
import type { SubsidyCategory, SubsidySearchParams, SubsidyTarget } from '@/types/subsidy'

type PageSearchParams = {
  q?: string
  category?: SubsidyCategory
  target?: SubsidyTarget
  region?: string
  status?: string
  page?: string
}

interface SubsidiesPageProps {
  searchParams: Promise<PageSearchParams>
}

export async function generateMetadata({ searchParams }: SubsidiesPageProps): Promise<Metadata> {
  const params = await searchParams

  const parts: string[] = []
  if (params.q) parts.push(`"${params.q}"`)
  if (params.category) parts.push(CATEGORY_LABELS[params.category])
  if (params.target) parts.push(TARGET_LABELS[params.target])
  if (params.region) parts.push(params.region)

  const title = parts.length > 0 ? `${parts.join(' ')} 지원금 검색` : '지원금 검색'
  const description = parts.length > 0
    ? `${parts.join(', ')} 관련 정부 지원금·보조금을 확인하고 신청하세요.`
    : '카테고리, 지역, 신청 대상별로 정부 지원금을 검색하세요.'

  const hasFilters = !!(params.q || params.category || params.target || params.region || params.status)

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/subsidies`,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/subsidies`,
    },
    // 필터가 걸린 검색 결과는 크롤러에게 중복 콘텐츠로 인식될 수 있어 noindex
    ...(hasFilters && { robots: { index: false, follow: true } }),
  }
}

export default async function SubsidiesPage({ searchParams }: SubsidiesPageProps) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page ?? 1))

  const apiParams: SubsidySearchParams = {
    q: params.q,
    category: params.category,
    target: params.target,
    region: params.region || undefined,
    status: params.status as SubsidySearchParams['status'],
    page,
    page_size: DEFAULT_PAGE_SIZE,
  }

  const { items: results, total: count } = await getSubsidies(apiParams).catch(() => ({
    items: [] as import('@/types/subsidy').SubsidyListItem[],
    total: 0,
    page: 1,
    page_size: DEFAULT_PAGE_SIZE,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  }))

  const hasFilters = !!(params.q || params.category || params.target || params.region || params.status)
  const heading = params.q ? `"${params.q}" 검색 결과` : '지원금 검색'

  // 페이지네이션 URL 빌더 (기존 필터 파라미터 유지)
  const baseParams = new URLSearchParams(
    Object.entries(params)
      .filter(([k, v]) => v != null && k !== 'page')
      .map(([k, v]) => [k, String(v)])
  )
  function buildPageHref(p: number): string {
    const next = new URLSearchParams(baseParams)
    if (p > 1) next.set('page', String(p))
    const qs = next.toString()
    return `/subsidies${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* 상단 헤더 */}
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-900 lg:text-xl">{heading}</h1>
        <p className="mt-1 text-sm text-gray-500">총 {count.toLocaleString()}건</p>
      </div>

      {/* 모바일: 필터 버튼 */}
      <div className="mb-4 lg:hidden">
        <Suspense>
          <MobileFilterSheet />
        </Suspense>
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
        {/* 데스크톱 사이드바 */}
        <aside className="hidden lg:block" aria-label="검색 필터">
          <div className="sticky top-[calc(var(--header-height)+1.5rem)] rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">필터</p>
              {hasFilters && (
                <a href="/subsidies" className="text-xs text-gray-400 hover:text-gray-700">
                  초기화
                </a>
              )}
            </div>
            <Suspense>
              <SearchFilterForm />
            </Suspense>
          </div>
        </aside>

        {/* 결과 영역 */}
        <section aria-label="검색 결과">
          <Suspense fallback={<SubsidyListSkeleton />}>
            <SubsidyList subsidies={results} />
          </Suspense>

          <Pagination
            currentPage={page}
            totalCount={count}
            pageSize={DEFAULT_PAGE_SIZE}
            buildHref={buildPageHref}
          />
        </section>
      </div>
    </div>
  )
}
