/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
import { env } from "@/env.mjs"
import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { z } from "zod"

// Imports the Google Analytics Data API client library.

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient()

// Runs a simple report.
export async function runReport(locale: string) {
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
    limit: 10,
  })

  if (!response.rows) return null
  return response.rows
    .map((row) => {
      const path = row.dimensionValues ? row.dimensionValues[0]?.value : undefined
      const metricValue = row.metricValues ? row.metricValues[0]?.value : undefined

      const recordParseResult = analyticsRecordSchema.safeParse({
        path,
        slug: path ? path.split("/")[3] : null,
        viewsAmount: metricValue ? parseInt(metricValue, 10) : null,
      })

      if (!recordParseResult.success) return null
      return recordParseResult.data
    })
    .filter((x): x is z.infer<typeof analyticsRecordSchema> => x !== null)
}

const analyticsRecordSchema = z.object({
  path: z.string(),
  slug: z.string(),
  viewsAmount: z.number(),
})
