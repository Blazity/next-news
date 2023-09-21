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
    <ul className="flex items-center justify-center gap-5 px-4">
      {navElements?.map((navElement) => (
        <li key={navElement?.slug}>
          <Link href={`/${lang}/${navElement?.slug}`}>{navElement?.title}</Link>
        </li>
      ))}
    </ul>
  )
}
