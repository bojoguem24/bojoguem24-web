'use client'

import { useState } from 'react'
import { SearchFilterForm } from './SearchFilterForm'

export function MobileFilterSheet() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-secondary flex items-center gap-2 lg:hidden"
        aria-label="필터 열기"
        aria-expanded={open}
        aria-controls="filter-sheet"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
        필터
      </button>

      {/* 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="검색 필터"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            id="filter-sheet"
            className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">필터</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
                aria-label="필터 닫기"
              >
                ✕
              </button>
            </div>

            <SearchFilterForm />

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 w-full"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </>
  )
}
