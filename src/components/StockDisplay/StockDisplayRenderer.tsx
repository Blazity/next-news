"use client"

import { MoveDown, MoveUp } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/utils/cn"

type StockDisplayRendererProps = {
  quotes: { name: string; id: string; changePercent: number }[]
}

export function StockDisplayRenderer({ quotes }: StockDisplayRendererProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState<boolean>(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
    }, 4000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (visible) return
    const timeoutId = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length)
      setVisible(true)
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [visible, quotes.length])

  const currentQuote = quotes[currentIndex]

  if (!currentQuote) return

  const isNegative = currentQuote.changePercent < 0

  return (
    <div className={cn("flex gap-4 text-sm transition-opacity duration-1000", visible ? "opacity-100" : "opacity-0")}>
      {currentQuote.name}
      <span className={cn("flex items-center gap-1", isNegative ? "text-red-800" : "text-green-800")}>
        {!isNegative && "+"}
        {currentQuote.changePercent.toFixed(2)}%
        {isNegative ? <MoveDown className="mt-0.5 h-3 w-3" /> : <MoveUp className="mt-0.5  h-3 w-3" />}
      </span>
    </div>
  )
}
