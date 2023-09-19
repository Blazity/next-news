import { Feed } from "feed"
import { env } from "@/env.mjs"
import { HygraphApi } from "@/hygraphApi/hygraphApi"

export default async function generateRssFeed(locale: string) {

  const { getRecentArticlesWithMetadata } = HygraphApi({})
  const { articles } = await getRecentArticlesWithMetadata({ locales: [locale] })

  const feedOptions = {
    title: "Articles | RSS Feed",
    description: "Welcome to this Articles!",
    id: env.VERCEL_URL,
    link: env.VERCEL_URL,
    language: locale,
    image: `${env.VERCEL_URL}/logo.png`,
    favicon: `${env.VERCEL_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${env.VERCEL_URL}/api/${locale}`,
    },
  }

  const feed = new Feed(feedOptions)

  articles.forEach((article) => {
    const date = article?.updatedAt ? new Date(article?.updatedAt) : new Date()
    feed.addItem({
      title: article?.title,
      id: `${env.VERCEL_URL}/blog/${article?.slug}`,
      link: `${env.VERCEL_URL}/blog/${article?.slug}`,
      description: "test",
      copyright: `All rights reserved ${new Date().getFullYear()}`,
      date: date,
      author: [{ name: article?.author?.name }],
      image: article?.coverImage?.url,
    })
  })

  return feed.rss2()
}
