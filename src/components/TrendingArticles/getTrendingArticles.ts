import { BetaAnalyticsDataClient } from "@google-analytics/data"
import keyBy from "lodash/keyBy"
import sortBy from "lodash/sortBy"
import { env } from "@/env.mjs"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"
import { pipe } from "@/utils/pipe"
import { getConfig } from "./reportConfig"

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: env.GA_EMAIL,
    private_key: env.GA_PRIVATE_KEY,
  },
})

async function runReport(locale: string) {
  const [response] = await analyticsDataClient.runReport(getConfig({ locale, propertyId: env.GA_PROPERTY_ID }))

  if (!response.rows) return null

  return response.rows
    .map((row) => {
      const path = row.dimensionValues ? row.dimensionValues[0].value : undefined
      const views = row.metricValues ? row.metricValues[0].value : undefined

      const slug = path ? path.split("/")[3] : null

      if (!slug) return null
      return {
        slug,
        views: views ? parseInt(views) : 0,
      }
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
}

const getArticlesFromReportResults =
  (lang: Locale) => async (reportResults: { views: number; slug: string }[] | null) => {
    const { getArticlesBySlug } = HygraphApi({ lang })

    const articleViewsMap = keyBy(reportResults, "slug")
    const { articles } = await getArticlesBySlug(
      { slugs: reportResults?.map((article) => article.slug) ?? [] },
      { next: { revalidate: 60 * 60 * 12 } }
    )
    const sortedArticles = sortBy(articles, (a) => articleViewsMap[a.slug].views ?? 0).reverse()
    return sortedArticles
  }

export const getTrendingArticles = (lang: Locale) => pipe(lang, runReport, getArticlesFromReportResults(lang))
