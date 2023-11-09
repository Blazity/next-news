"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NextIntlClientProvider } from "next-intl"
import { ReactNode, useState } from "react"
import { TooltipProvider } from "@/components/ui/Tooltip/Tooltip"
import { Locale } from "@/i18n/i18n"
import { GlobalTranslations } from "@/i18n/setTranslations"
import { TranslationsProvider } from "@/i18n/useTranslations"

export default function Providers({
  children,
  translations,
  locale,
}: {
  children: ReactNode
  translations: GlobalTranslations
  locale: Locale
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationsProvider translations={translations}>
        <TooltipProvider>
          <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
        </TooltipProvider>
      </TranslationsProvider>
    </QueryClientProvider>
  )
}
