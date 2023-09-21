import { getServerSideSitemapIndex } from "next-sitemap"
import { env } from "@/env.mjs"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { i18n } from "@/i18n/i18n"

const URLS_PER_SITEMAP = 1000

export async function GET() {
  const locales = i18n.locales
  const pagesSitemaps = locales.map((locale) => `${env.VERCEL_URL}/${locale}/sitemap.xml`)

  const articlesSitemapsPromises = locales.map(async (locale) => {
    const { getArticlesQuantity } = HygraphApi({ lang: locale })
    const {
      articlesConnection: {
        pageInfo: { pageSize = 0 },
      },
    } = await getArticlesQuantity({})

    const amountOfSitemapFiles = Math.ceil(pageSize ? pageSize / URLS_PER_SITEMAP : 1)

    return Array(amountOfSitemapFiles)
      .fill("")
      .map((_, index) => `${env.VERCEL_URL}/${locale}/article-sitemap/${index + 1}/server-sitemap.xml`)
  })

  const articlesSitemaps = (await Promise.all(articlesSitemapsPromises)).flat()

  return getServerSideSitemapIndex([...pagesSitemaps, ...articlesSitemaps])
}
