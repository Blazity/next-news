import Link from "next/link"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"

type NavigationProps = {
  lang: Locale
}

type Page = {
  __typename?: "Page"
  slug: string
  title: string
}

type NavItem = {
  pages: Page[]
}

export async function Navigation({ lang }: NavigationProps) {
  const { getNav } = HygraphApi({ lang })
  const { nav } = await getNav({})
  const navElements = nav.reduce((acc: Page[], curr: NavItem) => acc.concat(curr.pages), [])

  return (
    <ul className="flex items-center justify-center gap-5 px-4">
      {navElements.map((navElement) => (
        <li key={navElement.slug}>
          <Link href={`/${lang}/${navElement.slug}`}>{navElement.title}</Link>
        </li>
      ))}
    </ul>
  )
}
