import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_EMOJI,
  CATEGORY_LABELS,
  SITE_URL,
} from '@/lib/constants'
import type { SubsidyCategory } from '@/types/subsidy'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '지원금 카테고리',
  description: '주거, 취업, 교육, 복지 등 분야별 정부 지원금·보조금을 찾아보세요.',
  alternates: { canonical: `${SITE_URL}/categories` },
}

export default function CategoriesPage() {
  const categories = Object.entries(CATEGORY_LABELS) as [SubsidyCategory, string][]

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-1 text-xl font-bold text-gray-900">지원금 카테고리</h1>
      <p className="mb-8 text-sm text-gray-500">
        관심 있는 분야를 선택해 관련 지원금을 확인하세요.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2">
        {categories.map(([slug, label]) => (
          <li key={slug}>
            <Link
              href={`/categories/${slug}`}
              className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:ring-primary-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <span className="text-3xl" aria-hidden="true">
                {CATEGORY_EMOJI[slug]}
              </span>
              <div>
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                  {CATEGORY_DESCRIPTIONS[slug]}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Link href="/subsidies" className="btn-primary">
          전체 지원금 검색
        </Link>
      </div>
    </div>
  )
}
