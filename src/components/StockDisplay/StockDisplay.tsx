import { z } from "zod"
import { StockDisplayRenderer } from "./StockDisplayRenderer"

export async function StockDisplay({ quotes }: { quotes: Quote[] }) {
  const validQuotes = quotes.map((quote) => validateQuote(quote)) as Quote[]
  return <StockDisplayRenderer quotes={validQuotes} />
}

function validateQuote(stockQuote: unknown) {
  const result = quoteSchema.safeParse(stockQuote)
  if (!result.success) return null
  return result.data
}

const quoteSchema = z.object({
  id: z.string(),
  name: z.string(),
  change: z.string().transform((val) => parseFloat(val.slice(0, -1))),
})

type Quote = {
  id: string
  name: string
  change: number
}
