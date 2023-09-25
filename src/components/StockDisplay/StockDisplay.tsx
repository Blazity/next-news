import { z } from "zod"
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

export async function StockDisplay({ quotes }: { quotes: { id: string; name: string; quote?: unknown }[] }) {
  const validStockQuotes = quotes
    .map((stockQuote) => ({
      ...stockQuote,
      quote: validateQuote(stockQuote.quote),
    }))
    .filter((stockQuote): stockQuote is ValidStockQuote => stockQuote.quote !== null)
    .map(({ quote, ...stockQuoteProps }) => ({
      id: stockQuoteProps.id,
      name: stockQuoteProps.name,
      changePercent: quote["Global Quote"]["10. change percent"],
    }))

  return <StockDisplayRenderer quotes={validStockQuotes} />
}

function validateQuote(stockQuote: unknown) {
  const result = quoteSchema.safeParse(stockQuote)
  if (!result.success) return null
  return result.data
}

const quoteSchema = z.object({
  "Global Quote": z.object({
    "10. change percent": z.string().transform((val) => parseFloat(val.slice(0, -1))),
  }),
})
