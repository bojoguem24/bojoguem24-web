'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useRef, useTransition } from 'react'
import { CATEGORY_LABELS, REGION_OPTIONS, TARGET_LABELS } from '@/lib/constants'
import type { SubsidyCategory, SubsidyTarget } from '@/types/subsidy'

export function SearchFilterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(key, value)
      else params.delete(key)
      params.delete('page')
      const qs = params.toString()
      startTransition(() => {
        router.push(`/subsidies${qs ? `?${qs}` : ''}`)
      })
    },
    [router, searchParams]
  )

  const debouncedUpdate = useCallback(
    (key: string, value: string) => {
      clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => updateParam(key, value), 400)
    },
    [updateParam]
  )

  return (
    <form
      role="search"
      aria-label="지원금 검색 필터"
      className="space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label htmlFor="filter-q" className="mb-1 block text-xs font-semibold text-gray-700">
          검색어
        </label>
        <input
          id="filter-q"
          type="search"
          placeholder="지원금 이름, 기관 검색..."
          defaultValue={searchParams.get('q') ?? ''}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          onChange={(e) => debouncedUpdate('q', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="filter-category" className="mb-1 block text-xs font-semibold text-gray-700">
          카테고리
        </label>
        <select
          id="filter-category"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          defaultValue={searchParams.get('category') ?? ''}
          onChange={(e) => updateParam('category', e.target.value)}
        >
          <option value="">전체 카테고리</option>
          {(Object.entries(CATEGORY_LABELS) as [SubsidyCategory, string][]).map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-target" className="mb-1 block text-xs font-semibold text-gray-700">
          신청 대상
        </label>
        <select
          id="filter-target"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          defaultValue={searchParams.get('target') ?? ''}
          onChange={(e) => updateParam('target', e.target.value)}
        >
          <option value="">전체 대상</option>
          {(Object.entries(TARGET_LABELS) as [SubsidyTarget, string][]).map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-region" className="mb-1 block text-xs font-semibold text-gray-700">
          지역
        </label>
        <select
          id="filter-region"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          defaultValue={searchParams.get('region') ?? ''}
          onChange={(e) => updateParam('region', e.target.value)}
        >
          {REGION_OPTIONS.map((r) => (
            <option key={r} value={r === '전국' ? '' : r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-status" className="mb-1 block text-xs font-semibold text-gray-700">
          신청 상태
        </label>
        <select
          id="filter-status"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          defaultValue={searchParams.get('status') ?? ''}
          onChange={(e) => updateParam('status', e.target.value)}
        >
          <option value="">전체</option>
          <option value="active">신청 가능</option>
          <option value="upcoming">예정</option>
          <option value="closed">마감</option>
        </select>
      </div>

      {isPending && (
        <p className="text-xs text-primary-600" aria-live="polite" role="status">
          검색 중…
        </p>
      )}
    </form>
  )
}
