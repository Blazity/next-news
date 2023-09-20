import type { protos } from "@google-analytics/data"

export const getConfig = ({
  propertyId,
  locale,
}: {
  propertyId: string
  locale: string
}): protos.google.analytics.data.v1beta.IRunReportRequest => ({
  property: `properties/${propertyId}`,
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
