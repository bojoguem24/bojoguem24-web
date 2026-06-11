import type { MetadataRoute } from 'next'
import { getAllSubsidyIds } from '@/lib/api'
import { CATEGORY_LABELS, SITE_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const subsidyIds = await getAllSubsidyIds().catch(() => [] as { id: number; slug: string }[])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), priority: 1 },
    { url: `${SITE_URL}/subsidies`, lastModified: new Date(), priority: 0.9 },
    { url: `${SITE_URL}/categories`, lastModified: new Date(), priority: 0.85 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), priority: 0.5 },
    ...Object.keys(CATEGORY_LABELS).map((slug) => ({
      url: `${SITE_URL}/categories/${slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ]

  const subsidyRoutes: MetadataRoute.Sitemap = subsidyIds.map(({ id, slug }) => ({
    url: `${SITE_URL}/subsidies/${id}-${slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }))

  return [...staticRoutes, ...subsidyRoutes]
}
