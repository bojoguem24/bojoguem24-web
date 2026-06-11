import Link from 'next/link'
import type { Subsidy } from '@/types/subsidy'
import { CATEGORY_LABELS, SITE_URL, TARGET_LABELS } from '@/lib/constants'
import { buildSubsidyPath, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils'
import { ShareButton } from '@/components/common/ShareButton'

interface SubsidyDetailProps {
  subsidy: Subsidy
}

export function SubsidyDetail({ subsidy }: SubsidyDetailProps) {
  const pageUrl = `${SITE_URL}${buildSubsidyPath(subsidy.id, subsidy.slug)}`
  const isActive = subsidy.status === 'active'

  return (
    <article>
      {/* ── 헤더 ── */}
      <header className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Link
            href={`/categories/${subsidy.category}`}
            className="badge bg-primary-50 text-primary-700 hover:bg-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            {CATEGORY_LABELS[subsidy.category]}
          </Link>
          <span className={`badge ${getStatusColor(subsidy.status)}`} role="status">
            {getStatusLabel(subsidy.status)}
          </span>
          {subsidy.region && (
            <span className="badge bg-gray-100 text-gray-600">{subsidy.region}</span>
          )}
        </div>

        <h1 className="text-xl font-bold leading-snug text-gray-900 lg:text-2xl">
          {subsidy.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{subsidy.summary}</p>

        {/* 빠른 신청 버튼 — 모바일에서 헤더 바로 아래 표시 */}
        {subsidy.application_url && (
          <div className="mt-4 flex items-center gap-3">
            <a
              href={subsidy.application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              aria-label={`${subsidy.title} 신청 페이지로 이동 (새 창)`}
            >
              지금 신청하기
              <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <ShareButton title={subsidy.title} url={pageUrl} />
          </div>
        )}
        {!subsidy.application_url && (
          <div className="mt-4">
            <ShareButton title={subsidy.title} url={pageUrl} />
          </div>
        )}
      </header>

      {/* ── 본문 섹션들 ── */}
      <div className="space-y-6">
        {/* 지원 내용 */}
        <Section id="description" title="지원 내용">
          <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
            {subsidy.description}
          </p>
        </Section>

        {/* 지원 정보 */}
        <Section id="info" title="지원 정보">
          <dl className="grid gap-4 sm:grid-cols-2">
            <InfoItem label="지원 기관" value={subsidy.organization} />
            {subsidy.benefit_amount && (
              <InfoItem label="지원 금액" value={subsidy.benefit_amount} highlight />
            )}
            <InfoItem label="지원 유형" value={subsidy.benefit_type} />
            {subsidy.region && <InfoItem label="대상 지역" value={subsidy.region} />}
            <InfoItem
              label="신청 기간"
              value={
                subsidy.application_period_start || subsidy.application_period_end
                  ? `${formatDate(subsidy.application_period_start)} ~ ${formatDate(subsidy.application_period_end)}`
                  : '상시 신청'
              }
              dateRange={
                subsidy.application_period_start && subsidy.application_period_end
                  ? {
                      start: subsidy.application_period_start,
                      end: subsidy.application_period_end,
                    }
                  : undefined
              }
            />
          </dl>
        </Section>

        {/* 신청 대상 */}
        <Section id="target" title="신청 대상">
          <ul className="flex flex-wrap gap-2" aria-label="신청 가능한 대상">
            {subsidy.target.map((t) => (
              <li key={t}>
                <span className="badge bg-primary-50 text-primary-700 ring-1 ring-primary-200">
                  {TARGET_LABELS[t]}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 신청 요건 */}
        {subsidy.requirements.length > 0 && (
          <Section id="requirements" title="신청 요건">
            <ul className="space-y-2" aria-label="신청 요건 목록">
              {subsidy.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"
                    aria-hidden="true"
                  />
                  {req}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 제출 서류 */}
        {subsidy.documents.length > 0 && (
          <Section id="documents" title="제출 서류">
            <ul className="space-y-2" aria-label="제출 서류 목록">
              {subsidy.documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"
                    aria-hidden="true"
                  />
                  {doc}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 하단 신청 버튼 (데스크톱용 / 모바일에서도 보이지만 헤더 버튼과 중복) */}
        {subsidy.application_url && (
          <div className="rounded-2xl bg-primary-50 p-5">
            <p className="mb-3 text-sm font-semibold text-gray-900">
              {isActive ? '지금 바로 신청하세요' : '신청 페이지 바로가기'}
            </p>
            <a
              href={subsidy.application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              aria-label={`${subsidy.title} 공식 신청 페이지 이동 (새 창)`}
            >
              공식 신청 페이지
              <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <p className="mt-2 text-xs text-gray-500">외부 기관 사이트로 이동합니다.</p>
          </div>
        )}

        {/* 업데이트 날짜 */}
        <p className="text-xs text-gray-400">
          마지막 업데이트:{' '}
          <time dateTime={subsidy.updated_at}>{formatDate(subsidy.updated_at)}</time>
        </p>
      </div>
    </article>
  )
}

/* ── 섹션 컨테이너 ── */
function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={`section-${id}`}>
      <h2 id={`section-${id}`} className="section-title">
        {title}
      </h2>
      {children}
    </section>
  )
}

/* ── 정보 항목 ── */
interface InfoItemProps {
  label: string
  value: string
  highlight?: boolean
  dateRange?: { start: string; end: string }
}

function InfoItem({ label, value, highlight, dateRange }: InfoItemProps) {
  return (
    <div className="rounded-xl bg-gray-50 px-4 py-3">
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className={`mt-0.5 text-sm font-semibold ${highlight ? 'text-primary-700' : 'text-gray-900'}`}>
        {dateRange ? (
          <>
            <time dateTime={dateRange.start}>{formatDate(dateRange.start)}</time>
            {' ~ '}
            <time dateTime={dateRange.end}>{formatDate(dateRange.end)}</time>
          </>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}

/* ── 아이콘 ── */
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}
