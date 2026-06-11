import type { Metadata } from 'next'
import Link from 'next/link'
import { CATEGORY_LABELS } from '@/lib/constants'
import type { SubsidyCategory } from '@/types/subsidy'

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  robots: { index: false },
}

export default function NotFound() {
  const categories = Object.entries(CATEGORY_LABELS) as [SubsidyCategory, string][]

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-5xl font-bold text-primary-600">404</p>
      <h1 className="mt-3 text-lg font-bold text-gray-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-sm text-gray-500">
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있어요.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          홈으로
        </Link>
        <Link href="/subsidies" className="btn-secondary">
          지원금 검색
        </Link>
      </div>

      <section className="mt-12 w-full max-w-md" aria-labelledby="not-found-cats">
        <p id="not-found-cats" className="mb-3 text-xs font-semibold text-gray-500">
          카테고리로 찾아보기
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {categories.map(([slug, label]) => (
            <li key={slug}>
              <Link
                href={`/categories/${slug}`}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
