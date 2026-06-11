import type { SubsidyStatus } from '@/types/subsidy'

export function buildSubsidyPath(id: number, slug: string): string {
  return `/subsidies/${id}-${slug}`
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getStatusLabel(status: SubsidyStatus): string {
  const labels: Record<SubsidyStatus, string> = {
    active: '신청 가능',
    closed: '마감',
    upcoming: '예정',
  }
  return labels[status]
}

export function getStatusColor(status: SubsidyStatus): string {
  const colors: Record<SubsidyStatus, string> = {
    active: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-600',
    upcoming: 'bg-blue-100 text-blue-800',
  }
  return colors[status]
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
