# CLAUDE.md — bojoguem24-web

## 프로젝트 개요

정부 지원금/보조금 매칭 서비스의 프론트엔드.
백엔드(bojoguem24-api)와 별도 레포, REST API 통신.
프로그래매틱 SEO로 지원금마다 정적 페이지 생성. 검색 유입 극대화.
모바일 퍼스트 반응형 → 추후 PWA → React Native 앱 전환 대비.

## 기술 스택

- Next.js 14+ (App Router) / TypeScript strict / Tailwind CSS
- SSG + ISR (revalidate 3600초)
- Docker (개발 + 프로덕션)
- ESLint + Prettier

## 디렉토리 구조

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # 메인 (검색 폼 + 인기 카테고리)
│   ├── subsidies/
│   │   ├── page.tsx             # 검색 결과
│   │   └── [id]/page.tsx        # 상세 (SSG)
│   ├── categories/
│   │   └── [slug]/page.tsx      # 카테고리별
│   ├── about/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── layout/                  # Header, Footer, MobileNavBar
│   ├── subsidy/                 # SubsidyCard, SubsidyDetail, SubsidyList
│   ├── search/                  # SearchFilterForm, MobileFilterSheet
│   └── common/                  # Pagination, LoadingSkeleton
│
├── lib/
│   ├── api.ts                   # 백엔드 API 클라이언트
│   ├── constants.ts
│   └── utils.ts
│
├── types/
│   ├── subsidy.ts
│   └── api.ts
│
└── styles/globals.css
```

## 반응형 규칙

모바일 퍼스트. Tailwind 브레이크포인트:

```
기본(~640px)   모바일. 카드 1열, 바텀시트 필터, 하단 네비
md(768px)      태블릿. 카드 2열
lg(1024px)     데스크톱. 카드 3열 + 사이드바 필터
```

- 터치 타겟 최소 44px
- 모바일: 필터는 바텀시트 / 데스크톱: 좌측 사이드바
- 모든 컴포넌트 aria 속성 포함

## SEO (필수)

1. `generateStaticParams`로 모든 지원금 정적 빌드
2. ISR revalidate 3600초
3. 각 페이지 고유 meta title, description, OG tags
4. JSON-LD: GovernmentService 스키마
5. sitemap.xml + robots.txt 자동 생성
6. 네이버 서치어드바이저 메타태그
7. URL: `/subsidies/{id}-{slug}`

## API 연동

```
# Docker 내부 (서버 사이드)
API_URL=http://api:8000

# 클라이언트 사이드
NEXT_PUBLIC_API_URL=http://localhost:8000

# 프로덕션
NEXT_PUBLIC_API_URL=https://api.bojoguem24.kr
```

서버 컴포넌트 → `API_URL`, 클라이언트 컴포넌트 → `NEXT_PUBLIC_API_URL`

## 자주 쓰는 명령어

```bash
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml logs -f web
# 브라우저: http://localhost:3000
```

## 코딩 컨벤션

- TypeScript strict, 함수형 컴포넌트 + Hooks
- 서버 컴포넌트 우선, 필요 시만 'use client'
- Tailwind 유틸리티 (인라인 style 지양)
- next/image, next/link 사용
- 커밋: Conventional Commits

## 앱 전환 로드맵

```
[현재]  Next.js 웹 (반응형)
[6개월] PWA 추가 (next-pwa)
[1년+]  React Native (Google Play + App Store)
```
