import { useMemo } from "react"
import { z } from "zod"
import { HygraphClient } from "hygraphClient"
import { StockDisplayRenderer } from "./StockDisplayRenderer"

type StockQuoteBase = {
  id: string
  name: string
}
type ValidStockQuote = StockQuoteBase & { quote: AlphaVantageQuote }

type AlphaVantageQuote = {
  "Global Quote": {
    "10. change percent": number
  }
}

const SYMBOLS_TO_FETCH = ["SPY", "AAPL", "AMZN", "GOOGL", "MSFT"]

export async function StockDisplay() {
  const { getStockDailyQuotes } = HygraphClient()
  const { stockDailyQuotes: quotes } = await getStockDailyQuotes(
    { symbols: SYMBOLS_TO_FETCH },
    { next: { revalidate: 60 * 60 } }
  )

  const validStockQuotes = useMemo(
    () =>
      quotes
        .map((stockQuote) => ({ ...stockQuote, quote: validateQuote(stockQuote.quote) }))
        .filter((stockQuote): stockQuote is ValidStockQuote => stockQuote.quote !== null)
        .map(({ quote, ...stockQuoteProps }) => ({
          id: stockQuoteProps.id,
          name: stockQuoteProps.name,
          changePercent: quote["Global Quote"]["10. change percent"],
        })),
    [quotes]
  )

  return <StockDisplayRenderer quotes={validStockQuotes} />
}

function validateQuote(stockQuote: unknown) {
  const result = quoteSchema.safeParse(stockQuote)
  if (!result.success) return null
  return result.data
}

const quoteSchema = z.object({
  "Global Quote": z.object({ "10. change percent": z.string().transform((val) => parseFloat(val.slice(0, -1))) }),
})
