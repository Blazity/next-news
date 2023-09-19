/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { env } from "@/env.mjs"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"
import { pipe } from "@/utils/pipe"

// Imports the Google Analytics Data API client library.

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient()

// Runs a simple report.
async function runReport(locale: string) {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${env.GA_PROPERTY_ID}`,
    dateRanges: [
      {
        startDate: "7daysAgo",
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "pagePath",
      },
    ],
    metrics: [
      {
        name: "screenPageViews",
      },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: {
          matchType: "CONTAINS",
          value: `/${locale}/article/`,
        },
      },
    },
    orderBys: [
      {
        metric: { metricName: "screenPageViews" },
        desc: true,
      },
    ],
    limit: 16,
  })

  if (!response.rows) return null

  console.log(response.rows.map(row => `${row.dimensionValues ? row.dimensionValues[0]?.value : null} - views: ${row.metricValues ? row.metricValues[0]?.value : null}`))
  return response.rows
    .map((row) => {
      const path = row.dimensionValues ? row.dimensionValues[0]?.value : undefined

      const slug = path ? path.split("/")[3] : null

      if (!slug) return null
      return slug
    })
    .filter((x): x is string => x !== null)
}

export const getTrendingArticles = (lang: Locale) =>
  pipe(lang, runReport, async (results) => {
    const { getArticlesBySlug } = HygraphApi({ lang })
    console.log("INPUT", results)
    const { articles } = await getArticlesBySlug(
      { slugs: results?.map((slug) => slug) ?? [] },
      { next: { revalidate: 60 * 60 * 12 } }
    )
    console.log("RESULTS", articles.map(article => article.slug))
    return articles
  })
