import { ReactNode } from "react"

export function TagButton({ children }: { children: ReactNode }) {
  return <button className="flex items-center justify-center rounded-xl bg-custom-gray px-3 py-2">{children}</button>
}
