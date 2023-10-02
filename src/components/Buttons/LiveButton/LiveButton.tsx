import { ReactNode } from "react"

export function LiveButton({ children }: { children: ReactNode }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-xl bg-custom-green px-3 py-2">
      <div className="h-2 w-2 rounded-full bg-white" />
      {children}
    </button>
  )
}
