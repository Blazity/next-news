import { create } from "zustand"
import { i18n, Locale } from "i18n"

export const useLocale = create<{
  locale: Locale
}>(() => ({
  locale: i18n.defaultLocale,
}))
