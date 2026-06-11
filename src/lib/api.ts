import type { PaginatedResponse } from '@/types/api'
import type { Subsidy, SubsidyListItem, SubsidySearchParams } from '@/types/subsidy'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly path: string
  ) {
    super(`API ${status}: ${path}`)
    this.name = 'ApiError'
  }

  get isNotFound() {
    return this.status === 404
  }
  get isServerError() {
    return this.status >= 500
  }
}

function getBaseUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
  }
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
}

async function fetchApi<T>(path: string, init?: RequestInit, timeoutMs = 10_000): Promise<T> {
  const url = `${getBaseUrl()}${path}`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  let res: Response
  try {
    res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      signal: controller.signal,
      ...init,
    })
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      throw new ApiError(408, path)
    }
    throw err
  } finally {
    clearTimeout(timer)
  }

  if (!res.ok) {
    throw new ApiError(res.status, path)
  }

  return res.json() as Promise<T>
}

function buildQuery(params: object): string {
  const q = new URLSearchParams()
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== null && val !== '') {
      q.set(key, String(val))
    }
  }
  const qs = q.toString()
  return qs ? `?${qs}` : ''
}

export async function getSubsidies(
  params: SubsidySearchParams = {}
): Promise<PaginatedResponse<SubsidyListItem>> {
  return fetchApi<PaginatedResponse<SubsidyListItem>>(
    `/api/v1/subsidies/${buildQuery(params)}`,
    { next: { revalidate: 3600 } }
  )
}

export async function getSubsidy(id: number): Promise<Subsidy> {
  return fetchApi<Subsidy>(`/api/v1/subsidies/${id}/`, { next: { revalidate: 3600 } })
}

export async function getAllSubsidyIds(): Promise<{ id: number; slug: string }[]> {
  const data = await fetchApi<PaginatedResponse<SubsidyListItem>>(
    '/api/v1/subsidies/?page_size=1000',
    { next: { revalidate: 3600 } }
  )
  return data.items.map((s) => ({ id: s.id, slug: s.slug }))
}
