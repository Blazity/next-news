"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { TooltipProvider } from "@/components/ui/Tooltip/Tooltip"
import { GlobalTranslations } from "@/i18n/setTranslations"
import { TranslationsProvider } from "@/i18n/useTranslations"

export default function Providers({
  children,
  translations,
}: {
  children: ReactNode
  translations: GlobalTranslations
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
        <TooltipProvider>{children}</TooltipProvider>
      </TranslationsProvider>
    </QueryClientProvider>
  )
}
