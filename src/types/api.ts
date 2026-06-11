export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
}

export interface ApiErrorBody {
  detail: string
  code?: string
  field_errors?: Record<string, string[]>
}

export const EMPTY_PAGE = <T>(): PaginatedResponse<T> => ({
  items: [],
  total: 0,
  page: 1,
  page_size: 20,
  total_pages: 1,
  has_next: false,
  has_prev: false,
})
