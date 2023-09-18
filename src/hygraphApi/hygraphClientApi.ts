"use client"

import { HygraphApi } from "./hygraphApi"
import { useLocale } from "@/i18n/useLocale"

export function HygraphClientApi() {
  const locale = useLocale()
  return HygraphApi({ lang: locale })
}