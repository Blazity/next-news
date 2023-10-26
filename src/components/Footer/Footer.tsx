import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"
import { DynamicLangSelect } from "../LangSelect/DynamicLangSelect"
import { GetNavigationReturn } from "../Navigation/Navigation"

type FooterProps = {
  footer: Pick<GetNavigationReturn, "footer">["footer"]
  lang: Locale
  logoUrl: string | undefined
}

export async function Footer({ logoUrl, lang, footer }: FooterProps) {
  if (!footer?.contactSection) return null
  const { street, city, country, postCode } = footer.contactSection
  const { companyName, links, instagramLink, facebookLink, twitterLink, youtubeLink } = footer
  return (
    <footer className="flex w-full items-center justify-center bg-custom-gray-200 py-12">
      <div className="flex w-full max-w-[1200px] flex-wrap justify-between gap-10 p-4 lg:gap-0">
        <div className="flex flex-col justify-between gap-10 md:gap-0">
          <Image src={footer?.logo?.url ?? ""} width={100} height={30} alt="site-logo" quality={100} />
          <div className="text-sm">
            <p className="font-bold">{companyName}</p>
            <p>{street}</p>
            <div className="flex gap-2">
              <p>{postCode}</p>
              <p>{city}</p>
            </div>
            <p>{country}</p>
          </div>
        </div>
        <nav className="flex flex-col gap-10 md:gap-7">
          <div className="flex gap-4">
            <a href={twitterLink ?? ""} aria-label="Twitter" target="_blank" rel="noreferrer">
              <Twitter />
            </a>
            <a href={facebookLink ?? ""} aria-label="Facebook" target="_blank" rel="noreferrer">
              <Facebook />
            </a>
            <a href={instagramLink ?? ""} aria-label="Instagram" target="_blank" rel="noreferrer">
              <Instagram />
            </a>
            <a href={youtubeLink ?? ""} aria-label="Youtube" target="_blank" rel="noreferrer">
              <Youtube />
            </a>
          </div>
          <ul className="grid grid-cols-3 gap-x-10 gap-y-7 text-sm font-semibold md:gap-x-20">
            {links?.map((footerElement) => {
              const categoryUrl = footerElement.element?.__typename === "Category" ? "/category" : ""
              const url = `/${lang}${categoryUrl}/${footerElement?.element?.slug}`
              return (
                <li key={footerElement?.element?.slug}>
                  <Link prefetch={false} href={url} hrefLang={lang}>
                    {footerElement?.element?.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex flex-col justify-between gap-10 lg:items-end lg:gap-3">
          <div className="w-1/3">
            <DynamicLangSelect />
          </div>
          {logoUrl && (
            <Link
              hrefLang={lang}
              target="_blank"
              href={"https://blazity.com/"}
              className="flex max-h-[100px] w-full max-w-full lg:justify-end "
            >
              <Image src={logoUrl} width={100} height={100} alt="Blazity logo" className="w-1/3" />
            </Link>
          )}
          <p className="text-sm">
            © {new Date().getFullYear()} {companyName} {footer?.ownershipAndCredits}
          </p>
        </div>
      </div>
    </footer>
  )
}
