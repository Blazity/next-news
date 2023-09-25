import Link from "next/link"
import { Locale } from "@/i18n/i18n"
import { getFooter } from "@/lib/client"

type FooterProps = {
  lang: Locale
}

export async function Footer({ lang }: FooterProps) {
  const footer = await getFooter(lang)

  return (
    <footer className="flex w-[100%] items-center justify-between p-4">
      <p>Footer</p>
      <nav>
        <ul className="flex gap-5">
          {footer.pages.map((footerElement) => (
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
