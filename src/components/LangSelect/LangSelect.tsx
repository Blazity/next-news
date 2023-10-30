"use client"

import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/Select"
import { i18n, useLocale } from "@/i18n/i18n"

function LangSelect() {
  const router = useRouter()
  const lang = useLocale()

  return (
    <Select value={lang} onValueChange={(locale) => router.push(`/${locale}`)}>
      <SelectTrigger className="w-full min-w-full rounded-xl bg-white lg:min-w-[80px]" aria-label="language select">
        <SelectValue>{lang.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          {i18n.locales.map((locale) => {
            return (
              <SelectItem className="cursor-pointer" key={locale} value={locale}>
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
