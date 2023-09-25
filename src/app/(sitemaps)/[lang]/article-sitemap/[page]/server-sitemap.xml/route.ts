import { getServerSideSitemap } from "next-sitemap"
import { env } from "@/env.mjs"
import { Locale } from "@/i18n/i18n"
import { listArticlesForSitemap } from "@/lib/client"

const MAX_ARTICLES_PER_SITEMAP = 1000

async function generateSitemapFields(locale: Locale, pageNo: number) {
  const skip = (pageNo - 1) * MAX_ARTICLES_PER_SITEMAP

  const articles = await listArticlesForSitemap({ locale, skip, first: MAX_ARTICLES_PER_SITEMAP })

  const mappedArticles = articles.map((article) => ({
    loc: `${env.VERCEL_URL}/${locale}/articles/${article.slug}`,
    lastmod: article.updatedAt,
    priority: 0.6,
    changefreq: "daily" as const,
    images: article.coverImage ? [{ loc: new URL(article.coverImage.url) }] : undefined,
  }))

  return mappedArticles
}

export async function GET(req: Request, { params }: { params: { lang: Locale; page: string } }) {
  const pageNo = parseInt(params.page)
  const sitemapFields = await generateSitemapFields(params.lang, pageNo)

  const headers = {
    "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate",
    "Content-Type": "application/xml",
  }

  return getServerSideSitemap(sitemapFields, headers)
}
