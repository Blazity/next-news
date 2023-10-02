import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"
import { getNavigation } from "@/lib/client"

type NavigationProps = {
  locale: Locale
}

export async function Navigation({ locale }: NavigationProps) {
  const navigation = await getNavigation(locale)
  const { logo } = navigation

  return (
    <>
      <div className="flex w-full items-center justify-between gap-5 pr-4">
        <Link href={`/${locale}/`} hrefLang={locale}>
          <Image src={logo.url} width={100} height={20} alt="logo" className="" />
        </Link>
        <ul className="flex gap-5">
          {navigation.pages?.map((navElement) => (
            <li key={navElement?.slug}>
              <Link href={`/${locale}/${navElement?.slug}`} hrefLang={locale}>
                {navElement?.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
