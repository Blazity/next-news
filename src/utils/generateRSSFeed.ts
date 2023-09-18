import { Feed } from "feed"
import fs from "fs"
import { Article } from "gql/graphql"
import { HygraphClient } from "hygraphClient"
import { i18n } from "i18n"

export default async function generateRssFeed() {
  const locales = i18n.locales
  const site_url = process.env.URL || "localhost:3000"

  const { getArticlesWithMeta } = HygraphClient()

  const fetchedArticles: Article[] = []
  const feeds: Record<string, Feed> = {}
  const allLocaleArticles: Record<string, Article> = {}

  for (let i = 0; i < locales.length; i++) {
    const feedOptions = {
      title: "Blog posts | RSS Feed",
      description: "Welcome to this blog posts!",
      id: site_url,
      link: site_url,
      language: locales[i],
      image: `${site_url}/logo.png`,
      favicon: `${site_url}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}`,
      generator: "Feed for Node.js",
      feedLinks: {
        rss2: `${site_url}/rss.xml`,
      },
    }

    const locale = locales[i].replaceAll("-", "_")
    feeds[locale] = new Feed(feedOptions)
    const { articles } = await getArticlesWithMeta({ locales: [locale] })
    fetchedArticles.push(...(articles as Article[]))
  }

  for (let i = 0; i < fetchedArticles.length; i++) {
    const key = `${fetchedArticles[i].locale}-${fetchedArticles[i]?.slug}`
    allLocaleArticles[key] = fetchedArticles[i]
  }

  for (const article in allLocaleArticles) {
    const locale = article.split("-")[0]
    const date = allLocaleArticles[article]?.updatedAt ? new Date(allLocaleArticles[article]?.updatedAt) : new Date()
    feeds[locale].addItem({
      title: allLocaleArticles[article]?.title,
      id: `${site_url}/blog/${allLocaleArticles[article]?.slug}`,
      link: `${site_url}/blog/${allLocaleArticles[article]?.slug}`,
      description: "test",
      copyright: `All rights reserved ${new Date().getFullYear()}`,
      date: date,
      author: [{ name: allLocaleArticles[article]?.author?.name }],
      image: allLocaleArticles[article]?.coverImage?.url,
    })
  }

  for (const feed in feeds) {
    fs.writeFileSync(`./public/${feed}.xml`, feeds[feed].rss2())
  }
}
