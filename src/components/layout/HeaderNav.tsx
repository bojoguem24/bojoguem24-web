'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/subsidies', label: '지원금 검색' },
  { href: '/categories', label: '카테고리' },
  { href: '/about', label: '서비스 소개' },
] as const

export function HeaderNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
      {NAV_LINKS.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium transition',
              active
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            )}
            aria-current={active ? 'page' : undefined}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
