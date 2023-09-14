"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useEffect, useRef, useState } from "react"
import { Locale } from "i18n"
import { useLocale } from "store"

export default function Providers({ children, lang }: { children: ReactNode; lang: Locale }) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { refetchOnMount: false, refetchOnWindowFocus: false } } })
  )
  return (
    <>
      <StoreInitializer lang={lang} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}

export function StoreInitializer({ lang }: { lang: Locale }) {
  const initialized = useRef(false)

  if (!initialized.current) {
    useLocale.setState({ locale: lang })
    initialized.current = true
  }

  useEffect(() => {
    useLocale.setState({ locale: lang })
  }, [lang])
  return null
}
