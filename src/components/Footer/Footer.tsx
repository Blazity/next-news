import Link from "next/link"
import { Locale } from "@/i18n/i18n"
import { getFooter } from "@/lib/client"

type FooterProps = {
  lang: Locale
}

export async function Footer({ lang }: FooterProps) {
  const footer = await getFooter(lang)

  return (
    <footer className="flex w-full items-center justify-center border-t border-slate-200">
      <nav className="w-full max-w-[1200px] p-4">
        <ul className="flex gap-5">
          {footer.pages.map((footerElement) => (
            <li key={footerElement?.slug}>
              <Link href={`/${lang}/${footerElement?.slug}`} hrefLang={lang} prefetch={false}>
                {footerElement?.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
