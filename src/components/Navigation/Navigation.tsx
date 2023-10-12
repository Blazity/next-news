"use client"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Locale } from "@/i18n/i18n"
import { getNavigation } from "@/lib/client"
import { DynamicSearchDialog } from "../Search/DynamicSearchDialog"
import { Button } from "../ui/Button/Button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet/Sheet"

type NavigationProps = {
  navigation: Awaited<ReturnType<typeof getNavigation>>
  locale: Locale
}

export function Navigation({ locale, navigation }: NavigationProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { logo, elements } = navigation

  const navElements = elements?.map((navElement) => {
    const categoryUrl = navElement.element?.__typename === "Category" ? "/category" : ""
    const url = `/${locale}${categoryUrl}/${navElement?.element?.slug}`
    return (
      <li key={navElement?.element?.slug}>
        <Link href={url} hrefLang={locale} onClick={() => setIsSheetOpen(false)}>
          {navElement?.element?.title}
        </Link>
      </li>
    )
  })

  return (
    <div className="pointer-events-auto mx-4 flex w-full items-center justify-between gap-5">
      <Link
        href={`/${locale}/`}
        hrefLang={locale}
        prefetch={false}
        className="w-[100px]"
        onClick={() => setIsSheetOpen(false)}
      >
        <Image src={logo.url} width={100} height={30} alt="site-logo" quality={100} />
      </Link>
      <ul className="hidden items-center gap-5 sm:flex-wrap lg:flex">
        <li className="flex items-center">
          <DynamicSearchDialog />
        </li>
        {navElements}
      </ul>
      <ul className="flex items-center gap-5 sm:flex-wrap lg:hidden">
        <li className="flex items-center">
          <DynamicSearchDialog />
        </li>
        <Sheet open={isSheetOpen}>
          <SheetTrigger asChild onClick={() => setIsSheetOpen((prev) => !prev)}>
            <Button variant="ghost">{isSheetOpen ? <X /> : <Menu />}</Button>
          </SheetTrigger>
          <SheetContent className="mt-20 flex min-w-[100vw] list-none flex-col items-center justify-start text-center text-xl font-semibold">
            {navElements}
          </SheetContent>
        </Sheet>
      </ul>
    </div>
  )
}
