import { usePathname } from "next/navigation"
import { Locale } from "./i18n"

export function useLocale() {
  const path = usePathname()
  return path.split("/")[1] as Locale
}
