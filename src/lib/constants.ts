import type { SubsidyCategory, SubsidyTarget } from '@/types/subsidy'

export const SITE_NAME = '보조금24'
export const SITE_DESCRIPTION = '정부 지원금·보조금을 한 곳에서 쉽게 찾아보세요'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bojoguem24.kr'

export const CATEGORY_LABELS: Record<SubsidyCategory, string> = {
  housing: '주거',
  employment: '취업·창업',
  education: '교육',
  welfare: '복지',
  health: '의료·건강',
  childcare: '육아·보육',
  agriculture: '농업·어업',
  small_business: '소상공인',
}

export const CATEGORY_DESCRIPTIONS: Record<SubsidyCategory, string> = {
  housing: '전세자금, 월세 지원, 주거급여 등 주거 관련 지원금',
  employment: '취업성공패키지, 청년도약계좌, 창업 지원금',
  education: '국가장학금, 직업훈련, 평생교육 바우처',
  welfare: '기초생활수급, 차상위계층, 긴급복지 지원',
  health: '의료급여, 정신건강 지원, 건강검진 비용 지원',
  childcare: '아동수당, 보육료 지원, 영아수당',
  agriculture: '농업직불금, 귀농귀촌 지원, 어업 경영 지원',
  small_business: '소상공인 대출, 경영개선 지원, 재기 지원금',
}

export const CATEGORY_EMOJI: Record<SubsidyCategory, string> = {
  housing: '🏠',
  employment: '💼',
  education: '📚',
  welfare: '🤝',
  health: '🏥',
  childcare: '👶',
  agriculture: '🌾',
  small_business: '🏪',
}

export const TARGET_LABELS: Record<SubsidyTarget, string> = {
  youth: '청년',
  elderly: '노인',
  disabled: '장애인',
  low_income: '저소득층',
  farmer: '농어업인',
  small_business: '소상공인',
  general: '일반',
}

export const REGION_OPTIONS = [
  '전국',
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
]

export const DEFAULT_PAGE_SIZE = 12
