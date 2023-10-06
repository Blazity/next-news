import { ReactNode } from "react"
import { cn } from "@/utils/cn"

export function Tag({
  children,
  variant = "dark",
  className,
}: {
  children: ReactNode
  variant?: "light" | "dark" | "transparent"
  className?: string
}) {
  return (
    <div
      className={cn(
        variant === "transparent" && "bg-custom-gray-100 text-white",
        variant === "dark" && "bg-gray-500/90 text-white",
        variant === "light" && "bg-gray-200 text-black",
        " max-w-[150px]  overflow-hidden text-ellipsis rounded-xl px-3 py-2 text-left font-semibold",
        className
      )}
    >
      {children}
    </div>
  )
}
