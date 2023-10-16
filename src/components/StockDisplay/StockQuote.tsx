import { MoveDown, MoveUp } from "lucide-react"
import { cn } from "@/utils/cn"
import { Quote } from "./StockDisplayRenderer"

export function StockQuote({ quote }: { quote: Quote }) {
  const isNegative = quote.change < 0
  return (
    <div className="flex items-center justify-center gap-4 border-r-2 border-slate-100 px-10 text-sm">
      <span className="whitespace-nowrap font-medium">{quote.name}</span>
      <span className={cn("flex items-center gap-1", isNegative ? "text-red-800" : "text-green-800")}>
        {!isNegative && "+"}
        {quote.change.toFixed(2)}%
        {isNegative ? <MoveDown className="mt-0.5 h-3 w-3" /> : <MoveUp className="mt-0.5  h-3 w-3" />}
      </span>
    </div>
  )
}
