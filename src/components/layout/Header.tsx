import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'
import { HeaderNav } from './HeaderNav'

export function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 h-[var(--header-height)] border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      role="banner"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        {/* 로고 */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-extrabold text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          aria-label={`${SITE_NAME} 홈으로 이동`}
        >
          {SITE_NAME}
        </Link>

        {/* 데스크톱 네비게이션 — active 상태 처리를 위해 클라이언트 컴포넌트 */}
        <HeaderNav />

        {/* 모바일 검색 바로가기 */}
        <Link
          href="/subsidies"
          className="flex h-9 items-center rounded-lg bg-primary-600 px-4 text-xs font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:hidden"
          aria-label="지원금 검색하기"
        >
          검색하기
        </Link>
      </div>
    </header>
  )
}
