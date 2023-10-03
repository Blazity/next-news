import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"
import { getNavigation } from "@/lib/client"
import { DynamicSearchDialog } from "../Search/DynamicSearchDialog"

type NavigationProps = {
  locale: Locale
}

export async function Navigation({ locale }: NavigationProps) {
  const navigation = await getNavigation(locale)
  const { logo, elements } = navigation

  return (
    <>
      <div className="flex w-full items-center justify-between gap-5 pr-4">
        <Link href={`/${locale}/`} hrefLang={locale}>
          <Image src={logo.url} width={100} height={20} alt="logo" className="" />
        </Link>
        <ul className="flex items-center gap-5">
          <li className="flex items-center">
            <DynamicSearchDialog />
          </li>
          {elements?.map((navElement) => {
            const categoryUrl = navElement.element?.__typename === "Category" ? "/category" : ""
            const url = `/${locale}${categoryUrl}/${navElement?.element?.slug}`
            return (
              <li key={navElement?.element?.slug}>
                <Link href={url} hrefLang={locale}>
                  {navElement?.element?.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
