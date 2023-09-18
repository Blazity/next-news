import { Feed } from "feed"
import fs from "fs"
import { HygraphClient } from "hygraphClient"

export default async function generateRssFeed(locale: string) {
  const site_url = process.env.VERCEL_URL ?? "localhost:3000"

  const { getRecentArticlesWithMetadata } = HygraphClient()
  const { articles } = await getRecentArticlesWithMetadata({ locales: [locale] })

  const feedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    id: site_url,
    link: site_url,
    language: locale,
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
    },
  }

  const feed = new Feed(feedOptions)

  articles.forEach((article) => {
    const date = article?.updatedAt ? new Date(article?.updatedAt) : new Date()
    feed.addItem({
      title: article?.title,
      id: `${site_url}/blog/${article?.slug}`,
      link: `${site_url}/blog/${article?.slug}`,
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
