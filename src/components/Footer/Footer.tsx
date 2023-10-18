import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import { Locale } from "@/i18n/i18n"
import { DynamicLangSelect } from "../LangSelect/DynamicLangSelect"
import { GetNavigationReturn } from "../Navigation/Navigation"

type FooterProps = {
  footer: Pick<GetNavigationReturn, "footer">["footer"]
  lang: Locale
}

export async function Footer({ lang, footer }: FooterProps) {
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
            <a href={twitterLink ?? ""} target="_blank">
              <Twitter />
            </a>
            <a href={facebookLink ?? ""} target="_blank">
              <Facebook />
            </a>
            <a href={instagramLink ?? ""} target="_blank">
              <Instagram />
            </a>
            <a href={youtubeLink ?? ""} target="_blank">
              <Youtube />
            </a>
          </div>
          <ul className="grid grid-cols-3 gap-x-10 gap-y-7 text-sm font-semibold md:gap-x-20">
            {links?.map((footerElement) => {
              const categoryUrl = footerElement.element?.__typename === "Category" ? "/category" : ""
              const url = `/${lang}${categoryUrl}/${footerElement?.element?.slug}`
              return (
                <li key={footerElement?.element?.slug}>
                  <a href={url} hrefLang={lang}>
                    {footerElement?.element?.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex flex-col justify-between gap-10 lg:gap-0">
          <div className="flex w-1/3 justify-end lg:w-full">
            <DynamicLangSelect />
          </div>
          <p className="text-sm text-custom-gray-300">
            © {new Date().getFullYear()} {companyName} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
