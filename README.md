# bojoguem24-web

> 정부 지원금/보조금 매칭 서비스 — 프론트엔드

사용자 조건에 맞는 정부 지원금을 검색하고 상세 정보를 확인할 수 있는 웹 서비스.
프로그래매틱 SEO로 각 지원금마다 정적 페이지를 생성하여 검색 유입을 극대화.

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 14+ (App Router) |
| 언어 | TypeScript (strict) |
| 스타일 | Tailwind CSS |
| 렌더링 | SSG + ISR |
| 컨테이너 | Docker |

## 주요 기능

- 조건별 지원금 검색 (나이, 지역, 소득, 가구, 고용 상태)
- 지원금 상세 정보 (신청 방법, 자격 조건, 혜택 금액)
- 카테고리별 탐색
- 모바일 퍼스트 반응형 디자인
- SEO 최적화 (meta, OG, JSON-LD, sitemap, 네이버 서치어드바이저)

## 실행 (Docker)

```bash
# 루트 디렉토리(04_bojoguem24)에서
./setup.sh dev

# 또는 직접
docker-compose -f docker-compose.dev.yml up -d
```

브라우저: http://localhost:3000

## 페이지 구조

```
/                       메인 (검색 폼 + 인기 카테고리)
/subsidies              검색 결과 목록
/subsidies/{id}-{slug}  지원금 상세
/categories/{slug}      카테고리별 목록
/about                  사이트 소개
```

## 반응형

| 화면 | 레이아웃 |
|------|----------|
| 모바일 (~640px) | 카드 1열, 바텀시트 필터, 하단 네비 |
| 태블릿 (~1024px) | 카드 2열 |
| 데스크톱 (1025px~) | 카드 3열 + 사이드바 필터 |

## 앱 전환 로드맵

```
웹 (현재) → PWA (6개월) → React Native 앱 (1년+)
```

## 관련 레포

- 백엔드 API: [bojoguem24-api](https://github.com/bojoguem24/bojoguem24-api)
