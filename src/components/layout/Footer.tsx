import Link from 'next/link'
import { CATEGORY_LABELS, SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants'
import type { SubsidyCategory } from '@/types/subsidy'

const FOOTER_LINKS = [
  { href: '/subsidies', label: '지원금 검색' },
  { href: '/about', label: '서비스 소개' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const categories = Object.entries(CATEGORY_LABELS) as [SubsidyCategory, string][]

  return (
    <footer
      className="border-t border-gray-200 bg-white pb-[calc(var(--mobile-nav-height)+1.5rem)] pt-8 lg:pb-10"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* 브랜드 */}
          <div>
            <Link
              href="/"
              className="text-base font-extrabold text-primary-600 hover:text-primary-700"
              aria-label={`${SITE_NAME} 홈`}
            >
              {SITE_NAME}
            </Link>
            <p className="mt-2 text-xs leading-relaxed text-gray-500">{SITE_DESCRIPTION}</p>
          </div>

          {/* 메뉴 */}
          <nav aria-label="사이트 메뉴">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              메뉴
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 카테고리 */}
          <nav aria-label="카테고리 목록">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              카테고리
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {categories.map(([slug, label]) => (
                <li key={slug}>
                  <Link
                    href={`/categories/${slug}`}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-400">
            © <time dateTime={String(year)}>{year}</time> {SITE_NAME}. 본 서비스는 공공 데이터를
            기반으로 제공됩니다.
          </p>
          <p className="text-xs text-gray-400">
            지원금 정보는 참고용이며, 정확한 내용은 해당 기관에 문의하세요.
          </p>
        </div>
      </div>
    </footer>
  )
}
