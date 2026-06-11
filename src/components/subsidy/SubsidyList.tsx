import type { SubsidyListItem } from '@/types/subsidy'
import { SubsidyCard } from './SubsidyCard'

interface SubsidyListProps {
  subsidies: SubsidyListItem[]
}

export function SubsidyList({ subsidies }: SubsidyListProps) {
  if (subsidies.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="text-gray-500">검색 결과가 없습니다.</p>
        <p className="text-sm text-gray-400">다른 검색어나 필터를 사용해 보세요.</p>
      </div>
    )
  }

  return (
    <ul
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-label={`지원금 목록 ${subsidies.length}건`}
    >
      {subsidies.map((subsidy) => (
        <li key={subsidy.id}>
          <SubsidyCard subsidy={subsidy} />
        </li>
      ))}
    </ul>
  )
}
