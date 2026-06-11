export type SubsidyTarget =
  | 'youth'
  | 'elderly'
  | 'disabled'
  | 'low_income'
  | 'farmer'
  | 'small_business'
  | 'general'

export type SubsidyCategory =
  | 'housing'
  | 'employment'
  | 'education'
  | 'welfare'
  | 'health'
  | 'childcare'
  | 'agriculture'
  | 'small_business'

export type SubsidyStatus = 'active' | 'closed' | 'upcoming'

export interface Subsidy {
  id: number
  slug: string
  title: string
  summary: string
  description: string
  category: SubsidyCategory
  target: SubsidyTarget[]
  status: SubsidyStatus
  benefit_amount: string | null
  benefit_type: string
  application_period_start: string | null
  application_period_end: string | null
  application_url: string | null
  organization: string
  region: string | null
  requirements: string[]
  documents: string[]
  created_at: string
  updated_at: string
}

export type SubsidyListItem = Pick<
  Subsidy,
  | 'id'
  | 'slug'
  | 'title'
  | 'summary'
  | 'category'
  | 'target'
  | 'status'
  | 'benefit_amount'
  | 'benefit_type'
  | 'application_period_end'
  | 'organization'
  | 'region'
>

export interface SubsidySearchParams {
  q?: string
  category?: SubsidyCategory
  target?: SubsidyTarget
  region?: string
  status?: SubsidyStatus
  page?: number
  page_size?: number
}
