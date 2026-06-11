import Link from 'next/link'
import type { SubsidyListItem } from '@/types/subsidy'
import { CATEGORY_LABELS, TARGET_LABELS } from '@/lib/constants'
import { buildSubsidyPath, cn, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils'

interface SubsidyCardProps {
  subsidy: SubsidyListItem
}

export function SubsidyCard({ subsidy }: SubsidyCardProps) {
  const href = buildSubsidyPath(subsidy.id, subsidy.slug)
  const isClosed = subsidy.status === 'closed'
  const daysLeft = getDaysLeft(subsidy.application_period_end)

  return (
    <article
      className={cn(
        'card group relative flex flex-col gap-3',
        isClosed
          ? 'opacity-60'
          : 'hover:shadow-md hover:ring-primary-200 focus-within:ring-2 focus-within:ring-primary-500'
      )}
    >
      {/* 상태·카테고리 배지 */}
      <div className="flex items-start justify-between gap-2">
        <span className="badge bg-primary-50 text-primary-700">
          {CATEGORY_LABELS[subsidy.category]}
        </span>
        <span className={cn('badge', getStatusColor(subsidy.status))}>
          {getStatusLabel(subsidy.status)}
        </span>
      </div>

      {/* 제목 — stretched link 패턴: after:absolute after:inset-0 으로 카드 전체를 클릭 영역으로 */}
      <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-primary-700">
        <Link
          href={href}
          className={cn(
            'focus:outline-none',
            'after:absolute after:inset-0 after:rounded-2xl after:content-[\'\']',
            'focus-visible:after:ring-2 focus-visible:after:ring-primary-500 focus-visible:after:ring-offset-2'
          )}
        >
          {subsidy.title}
        </Link>
      </h3>

      {/* 요약 */}
      <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">{subsidy.summary}</p>

      {/* 신청 대상 배지 — 최대 2개 표시 */}
      {subsidy.target.length > 0 && (
        <div className="flex flex-wrap gap-1" aria-label="신청 대상">
          {subsidy.target.slice(0, 2).map((t) => (
            <span key={t} className="badge bg-gray-50 text-gray-500 text-[10px] ring-1 ring-gray-200">
              {TARGET_LABELS[t]}
            </span>
          ))}
          {subsidy.target.length > 2 && (
            <span className="badge bg-gray-50 text-gray-400 text-[10px] ring-1 ring-gray-200">
              +{subsidy.target.length - 2}
            </span>
          )}
        </div>
      )}

      {/* 하단 정보 */}
      <div className="mt-auto flex items-end justify-between pt-1">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-gray-400">{subsidy.organization}</span>
          {subsidy.region && (
            <span className="text-[11px] text-gray-400">{subsidy.region}</span>
          )}
        </div>
        {subsidy.benefit_amount && (
          <span className="text-xs font-bold text-primary-600">{subsidy.benefit_amount}</span>
        )}
      </div>

      {/* 마감일 */}
      {subsidy.application_period_end && (
        <p
          className={cn(
            'text-[11px]',
            daysLeft !== null && daysLeft <= 7 && !isClosed
              ? 'font-semibold text-red-500'
              : 'text-gray-400'
          )}
        >
          {daysLeft !== null && daysLeft <= 7 && !isClosed && '⚡ '}
          마감{' '}
          <time dateTime={subsidy.application_period_end}>
            {formatDate(subsidy.application_period_end)}
          </time>
          {daysLeft !== null && daysLeft >= 0 && !isClosed && (
            <span className="ml-1">({daysLeft === 0 ? 'D-day' : `D-${daysLeft}`})</span>
          )}
        </p>
      )}
    </article>
  )
}

function getDaysLeft(dateStr: string | null): number | null {
  if (!dateStr) return null
  const d = new Date(dateStr)
  const deadline = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const n = new Date()
  const today = new Date(n.getFullYear(), n.getMonth(), n.getDate())
  return Math.round((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}
