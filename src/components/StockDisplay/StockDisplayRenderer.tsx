import { StockQuote } from "./StockQuote"

export type Quote = { name: string; id: string; changePercent: number }

type StockDisplayRendererProps = {
  quotes: Quote[]
}

export function StockDisplayRenderer({ quotes }: StockDisplayRendererProps) {
  return (
    <div className="my-8 flex w-full overflow-hidden rounded-xl border-[1px] bg-custom-gray-50">
      <div className={"flex h-12 w-max animate-[wiggle_20s_linear_infinite] items-center "}>
        {quotes.map((quote) => (
          <StockQuote key={quote.id} quote={quote} />
        ))}
        {quotes.map((quote) => (
          <StockQuote key={"dup-" + quote.id} quote={quote} />
        ))}
      </div>
    </div>
  )
}
