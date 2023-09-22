import Link from "next/link"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"

type FooterProps = {
  lang: Locale
}

export async function Footer({ lang }: FooterProps) {
  const { getFooter } = HygraphApi({ lang })
  const { footers } = await getFooter({})
  const footerElements = footers[0]?.pages

  return (
    <footer className="flex w-[100%] items-center justify-between p-4">
      <p>Footer</p>
      <nav>
        <ul className="flex gap-5">
          {footerElements?.map((footerElement) => (
            <li key={footerElement?.slug}>
              <Link href={`/${lang}/${footerElement?.slug}`} prefetch={false}>
                {footerElement?.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
