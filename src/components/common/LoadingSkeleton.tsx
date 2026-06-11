function Bone({ className }: { className?: string }) {
  return <div className={`rounded-lg bg-gray-200 ${className ?? ''}`} aria-hidden="true" />
}

/* ── 카드 스켈레톤 ── */
export function SubsidyCardSkeleton() {
  return (
    <div className="card animate-pulse" aria-hidden="true">
      {/* 배지 행 */}
      <div className="flex items-start justify-between gap-2">
        <Bone className="h-5 w-14 rounded-full" />
        <Bone className="h-5 w-12 rounded-full" />
      </div>
      {/* 제목 */}
      <Bone className="mt-3 h-4 w-4/5" />
      <Bone className="mt-1.5 h-4 w-3/5" />
      {/* 요약 */}
      <Bone className="mt-3 h-3 w-full" />
      <Bone className="mt-1.5 h-3 w-5/6" />
      {/* 하단 */}
      <div className="mt-4 flex items-center justify-between">
        <Bone className="h-3 w-20" />
        <Bone className="h-3 w-16" />
      </div>
      <Bone className="mt-2 h-3 w-28" />
    </div>
  )
}

export function SubsidyListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="지원금 목록 불러오는 중"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SubsidyCardSkeleton key={i} />
      ))}
    </div>
  )
}

/* ── 상세 페이지 스켈레톤 ── */
export function SubsidyDetailSkeleton() {
  return (
    <div className="animate-pulse" role="status" aria-label="지원금 상세 불러오는 중">
      {/* 배지 */}
      <div className="flex gap-2">
        <Bone className="h-5 w-14 rounded-full" />
        <Bone className="h-5 w-12 rounded-full" />
      </div>
      {/* 제목 */}
      <Bone className="mt-4 h-7 w-4/5" />
      <Bone className="mt-2 h-5 w-3/5" />
      {/* 요약 */}
      <Bone className="mt-3 h-4 w-full" />
      <Bone className="mt-1.5 h-4 w-5/6" />
      {/* 버튼 */}
      <div className="mt-5 flex gap-3">
        <Bone className="h-10 w-32 rounded-xl" />
        <Bone className="h-10 w-20 rounded-xl" />
      </div>

      {/* 섹션들 */}
      {[120, 100, 80].map((h, i) => (
        <div key={i} className="mt-8">
          <Bone className="h-5 w-24" />
          <div className="mt-3 space-y-2">
            <Bone className={`h-4 w-full`} />
            <Bone className="h-4 w-5/6" />
            {h > 100 && <Bone className="h-4 w-4/6" />}
          </div>
        </div>
      ))}
    </div>
  )
}
