import { getServerSideSitemapIndex } from "next-sitemap"
import { env } from "@/env.mjs"
import { i18n } from "@/i18n/i18n"
import { getArticlesQuantity } from "@/lib/client"

const URLS_PER_SITEMAP = 1000

export async function GET() {
  const locales = i18n.locales
  const pagesSitemaps = locales.map((locale) => `${env.NEXT_PUBLIC_SITE_URL}/${locale}/sitemap.xml`)

  const articlesSitemapsPromises = locales.map(async (locale) => {
    const allArticlesCount = await getArticlesQuantity(locale)

    const amountOfSitemapFiles = Math.ceil(allArticlesCount / URLS_PER_SITEMAP)

    return Array(amountOfSitemapFiles)
      .fill("")
      .map((_, index) => `${env.NEXT_PUBLIC_SITE_URL}/${locale}/article-sitemap/${index + 1}/server-sitemap.xml`)
  })

  const articlesSitemaps = (await Promise.all(articlesSitemapsPromises)).flat()

  return getServerSideSitemapIndex([...pagesSitemaps, ...articlesSitemaps])
}
