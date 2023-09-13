import { useMemo } from "react"
import { z } from "zod"

type StockQuoteBase = {
  id: string
  name: string
}

type ValidStockQuote = StockQuoteBase & { quote: AlphaVantageQuote }

type StockQuote = StockQuoteBase & { quote?: any }

type AlphaVantageQuote = {
  "Global Quote": {
    "10. change percent": string
  }
}

type StockDisplayProps = {
  quotes: StockQuote[]
}

export function validateQuote(stockQuote: StockQuote) {
  const result = quoteSchema.safeParse(stockQuote)
  if (!result.success) return null
  return result.data
}

const quoteSchema = z.object({ "Global Quote": z.object({ "10. change percent": z.string() }) })

export function StockDisplay({ quotes }: StockDisplayProps) {
  const validStockQuotes = useMemo(
    () =>
      quotes
        .map((stockQuote) => ({ ...stockQuote, quote: validateQuote(stockQuote.quote) }))
        .filter((stockQuote): stockQuote is ValidStockQuote => stockQuote.quote !== null)
        .map(({ quote, ...stockQuoteProps }) => ({
          ...stockQuoteProps,
          changePercent: quote["Global Quote"]["10. change percent"],
        })),
    [quotes]
  )

  return null
}
