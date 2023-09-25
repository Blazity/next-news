import { getServerSideSitemap } from "next-sitemap"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"

const MAX_ARTICLES_PER_SITEMAP = 1000

async function generateSitemapFields(locale: string, pageNo: number) {
  const skip = (pageNo - 1) * MAX_ARTICLES_PER_SITEMAP
  const { getArticlesForSitemap } = HygraphApi({ lang: locale as Locale })
  const { articles } = await getArticlesForSitemap({ skip, first: MAX_ARTICLES_PER_SITEMAP })

  const mappedArticles = articles.map((article) => ({
    loc: `/${locale}/articles/${article.slug}`,
    lastmod: article.updatedAt,
    priority: 0.6,
    changefreq: "daily" as const,
    images: article.image?.data ? [{ loc: new URL(article.image.data.url) }] : undefined,
  }))

  return mappedArticles
}

export async function GET(req: Request, { params }: { params: { lang: string; page: string } }) {
  const pageNo = parseInt(params.page)
  const sitemapFields = await generateSitemapFields(params.lang, pageNo)

  const headers = {
    "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate",
    "Content-Type": "application/xml",
  }

  return getServerSideSitemap(sitemapFields, headers)
}
