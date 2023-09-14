"use client"

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "components/ui/Select/Select"
import { i18n, type Locale } from "i18n"

export type LangSelectProps = { lang: Locale }

function LangSelect({ lang }: LangSelectProps) {
  const router = useRouter()

  return (
    <Select value={lang} onValueChange={(locale) => router.push(`/${locale}`)}>
      <SelectTrigger className="w-[100px]" aria-label="language select">
        <SelectValue>{lang}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          {i18n.locales.map((locale) => {
            return (
              <SelectItem key={locale} value={locale}>
                {locale}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LangSelect
