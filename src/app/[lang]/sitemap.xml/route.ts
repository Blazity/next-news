import { getServerSideSitemap } from "next-sitemap"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"

async function generateSitemapFields(locale: string) {
  const { getPagesConfig } = HygraphApi({ lang: locale as Locale })
  const { pages } = await getPagesConfig({})

  const mappedPages = pages.map((page) => ({
    loc: `${locale}/${page.slug}`,
    lastModified: null,
    priority: 0.8,
    changefreq: "monthly" as const,
  }))

  return mappedPages
}

export async function GET(request: Request, { params }: { params: { lang: string } }) {
  const sitemapFields = await generateSitemapFields(params.lang)

  const headers = {
    "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate",
    "Content-Type": "application/xml",
  }

  return getServerSideSitemap(sitemapFields, headers)
}
