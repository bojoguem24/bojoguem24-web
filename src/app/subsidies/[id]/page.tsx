import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllSubsidyIds, getSubsidy } from '@/lib/api'
import { CATEGORY_LABELS, SITE_NAME, SITE_URL, TARGET_LABELS } from '@/lib/constants'
import { SubsidyDetail } from '@/components/subsidy/SubsidyDetail'

export const revalidate = 3600

interface SubsidyPageProps {
  params: Promise<{ id: string }>
}

function parseId(idSlug: string): number {
  return parseInt(idSlug.split('-')[0], 10)
}

export async function generateStaticParams() {
  const ids = await getAllSubsidyIds().catch(() => [] as { id: number; slug: string }[])
  return ids.map(({ id, slug }) => ({ id: `${id}-${slug}` }))
}

export async function generateMetadata({ params }: SubsidyPageProps): Promise<Metadata> {
  const { id: idSlug } = await params
  const id = parseId(idSlug)

  const subsidy = await getSubsidy(id).catch(() => null)
  if (!subsidy) return {}

  const title = subsidy.title
  const description = subsidy.summary
  const url = `${SITE_URL}/subsidies/${idSlug}`
  const keywords = [
    subsidy.title,
    CATEGORY_LABELS[subsidy.category],
    ...subsidy.target.map((t) => TARGET_LABELS[t]),
    subsidy.organization,
    '지원금',
    '보조금',
    '신청',
  ]

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      type: 'article',
      locale: 'ko_KR',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  }
}

export default async function SubsidyPage({ params }: SubsidyPageProps) {
  const { id: idSlug } = await params
  const id = parseId(idSlug)

  const subsidy = await getSubsidy(id).catch(() => null)
  if (!subsidy) notFound()

  const pageUrl = `${SITE_URL}/subsidies/${idSlug}`
  const categoryUrl = `${SITE_URL}/categories/${subsidy.category}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'GovernmentService',
      '@id': pageUrl,
      name: subsidy.title,
      description: subsidy.summary,
      provider: {
        '@type': 'GovernmentOrganization',
        name: subsidy.organization,
      },
      serviceType: CATEGORY_LABELS[subsidy.category],
      areaServed: {
        '@type': 'AdministrativeArea',
        name: subsidy.region ?? '대한민국',
      },
      url: subsidy.application_url ?? pageUrl,
      ...(subsidy.application_period_start && {
        availabilityStarts: subsidy.application_period_start,
      }),
      ...(subsidy.application_period_end && {
        availabilityEnds: subsidy.application_period_end,
      }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: CATEGORY_LABELS[subsidy.category], item: categoryUrl },
        { '@type': 'ListItem', position: 3, name: subsidy.title, item: pageUrl },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:py-10">
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      {/* 브레드크럼 */}
      <nav aria-label="탐색 경로" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
          <li>
            <Link href="/" className="hover:text-gray-700">홈</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href={`/categories/${subsidy.category}`} className="hover:text-gray-700">
              {CATEGORY_LABELS[subsidy.category]}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-gray-600 font-medium truncate max-w-[180px]" aria-current="page">
            {subsidy.title}
          </li>
        </ol>
      </nav>

      <SubsidyDetail subsidy={subsidy} />
    </div>
  )
}
