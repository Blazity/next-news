import { ReactNode } from "react"
import { cn } from "@/utils/cn"

export function TagButton({ children, variant = "dark" }: { children: ReactNode; variant?: "light" | "dark" }) {
  return (
    <button
      className={cn(
        variant === "dark" && "bg-gray-500/90 text-white",
        variant === "light" && "bg-gray-200 text-black",
        "flex items-center justify-center rounded-xl  px-3 py-2 font-semibold"
      )}
    >
      {children}
    </button>
  )
}
