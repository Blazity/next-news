import { Feed } from "feed"
import { env } from "@/env.mjs"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"

export default async function generateRssFeed(locale: Locale) {
  const SITE_URL = env.VERCEL_URL

  const { getRecentArticlesWithMetadata } = HygraphApi({ lang: locale })
  const { articles } = await getRecentArticlesWithMetadata({})

  const feedOptions = {
    title: "Articles | RSS Feed",
    description: "Welcome to this Articles!",
    id: SITE_URL,
    link: SITE_URL,
    language: locale,
    image: `${SITE_URL}/logo.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${SITE_URL}/api/${locale}`,
    },
  }

  const feed = new Feed(feedOptions)

  articles.forEach((article) => {
    const date = article?.updatedAt ? new Date(article?.updatedAt) : new Date()
    feed.addItem({
      title: article?.title,
      id: `${SITE_URL}/${locale}/article/${article?.slug}`,
      link: `${SITE_URL}/${locale}/article/${article?.slug}`,
      description: "test",
      copyright: `All rights reserved ${new Date().getFullYear()}`,
      date: date,
      author: [{ name: article?.author?.name }],
      image: article?.coverImage?.url,
    })
  })

  return feed.rss2()
}
