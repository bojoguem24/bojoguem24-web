import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalCount: number
  pageSize: number
  buildHref: (page: number) => string
}

export function Pagination({ currentPage, totalCount, pageSize, buildHref }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize)
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-1"
      aria-label="페이지 내비게이션"
    >
      <PageLink
        href={buildHref(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="이전 페이지"
      >
        ‹
      </PageLink>

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="flex h-9 w-6 items-center justify-center text-gray-400" aria-hidden="true">
            …
          </span>
        ) : (
          <PageLink
            key={page}
            href={buildHref(Number(page))}
            active={page === currentPage}
            aria-label={`${page}페이지`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </PageLink>
        )
      )}

      <PageLink
        href={buildHref(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="다음 페이지"
      >
        ›
      </PageLink>
    </nav>
  )
}

type PageLinkProps = {
  href: string
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

function PageLink({ href, children, active, disabled, ...props }: PageLinkProps) {
  const cls = cn(
    'flex h-9 min-w-[36px] items-center justify-center rounded-lg px-2 text-sm font-medium transition',
    active
      ? 'bg-primary-600 text-white pointer-events-none'
      : disabled
        ? 'pointer-events-none text-gray-300'
        : 'text-gray-700 hover:bg-gray-100'
  )

  if (disabled) return <span className={cls} aria-hidden="true">{children}</span>

  return (
    <Link href={href} className={cls} {...props}>
      {children}
    </Link>
  )
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | '...')[] = [1]

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')
  pages.push(total)

  return pages
}
