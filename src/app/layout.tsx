import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileNavBar } from '@/components/layout/MobileNavBar'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const naverVerification = process.env.NAVER_SITE_VERIFICATION

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — 정부 지원금 한눈에`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['정부지원금', '보조금', '국가보조금', '지원금 신청', '복지혜택', '청년지원금'],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — 정부 지원금 한눈에`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — 정부 지원금 한눈에`,
    description: SITE_DESCRIPTION,
  },
  ...(naverVerification && {
    verification: {
      other: { 'naver-site-verification': naverVerification },
    },
  }),
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          본문 바로가기
        </a>
        <Header />
        <main
          id="main-content"
          className="min-h-screen pb-[var(--mobile-nav-height)] pt-[var(--header-height)] lg:pb-0"
        >
          {children}
        </main>
        <Footer />
        <MobileNavBar />
      </body>
    </html>
  )
}
