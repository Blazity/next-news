import Link from "next/link"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"

type NavigationProps = {
  lang: Locale
}

export async function Navigation({ lang }: NavigationProps) {
  const { getNav } = HygraphApi({ lang })
  const { navigations } = await getNav({})
  const navElements = navigations[0]?.pages

  return (
    <div className="flex w-full items-center justify-between gap-5 pr-4">
      <Link href={`/${lang}/`} hrefLang={lang} prefetch={false}>
        {"Home"}
      </Link>
      <ul className="flex gap-5">
        {navElements?.map((navElement) => (
          <li key={navElement?.slug}>
            <Link href={`/${lang}/${navElement?.slug}`} hrefLang={lang} prefetch={false}>
              {navElement?.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
