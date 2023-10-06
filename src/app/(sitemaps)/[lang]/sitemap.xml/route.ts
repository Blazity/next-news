import { getServerSideSitemap } from "next-sitemap"
import { env } from "@/env.mjs"
import { Locale } from "@/i18n/i18n"
import { listPagesForSitemap } from "@/lib/client"

async function generateSitemapFields(locale: Locale) {
  const pages = await listPagesForSitemap(locale)

  const mappedPages = pages.map((page) => ({
    loc: `${env.NEXT_PUBLIC_SITE_URL}/${locale}/${page.slug}`,
    lastModified: null,
    priority: 0.8,
    changefreq: "monthly" as const,
  }))

  return mappedPages
}

export async function GET(request: Request, { params }: { params: { lang: Locale } }) {
  const sitemapFields = await generateSitemapFields(params.lang)

  const headers = {
    "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate",
    "Content-Type": "application/xml",
  }

  return getServerSideSitemap(sitemapFields, headers)
}
