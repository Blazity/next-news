"use client"

import { useLocale } from "i18n/useLocale"
import { HygraphApi } from "./hygraphApi"

export function HygraphClientApi() {
  const locale = useLocale()
  return HygraphApi({ lang: locale })
}