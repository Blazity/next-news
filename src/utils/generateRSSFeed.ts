import { Feed } from "feed"
import fs from "fs"
import { HygraphClient } from "@/hygraphClient"

export default async function generateRssFeed(locale: string) {
  const siteUrl = process.env.VERCEL_URL ?? "localhost:3000"

  const { getRecentArticlesWithMetadata } = HygraphClient()
  const { articles } = await getRecentArticlesWithMetadata({ locales: [locale] })

  const feedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    id: siteUrl,
    link: siteUrl,
    language: locale,
    image: `${siteUrl}/logo.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
  }

  const feed = new Feed(feedOptions)

  articles.forEach((article) => {
    const date = article?.updatedAt ? new Date(article?.updatedAt) : new Date()
    feed.addItem({
      title: article?.title,
      id: `${siteUrl}/blog/${article?.slug}`,
      link: `${siteUrl}/blog/${article?.slug}`,
      description: "test",
      copyright: `All rights reserved ${new Date().getFullYear()}`,
      date: date,
      author: [{ name: article?.author?.name }],
      image: article?.coverImage?.url,
    })
  })

  fs.writeFile(`./public/${locale}.xml`, feed.rss2(), (err) => {
    if (err) return console.log(err)
  })
}
