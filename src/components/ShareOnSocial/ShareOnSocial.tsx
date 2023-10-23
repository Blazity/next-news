import { Facebook, Linkedin, Twitter } from "lucide-react"
import { Locale } from "@/i18n/i18n"

type ShareOnSocialProps = {
  lang: Locale
  articleTitle: string
  articleUrl: string
}

export function ShareOnSocial({ articleTitle, articleUrl, lang }: ShareOnSocialProps) {
  const encodedTitle = encodeURIComponent(articleTitle)
  const encodedUrl = encodeURIComponent(articleUrl)

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${articleUrl}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`

  return (
    <div className="flex items-center justify-between gap-2 py-5 lg:justify-normal">
      <p className="pr-3 text-sm text-custom-gray-300">Share on social:</p>
      <div className="flex items-center gap-2">
        <a href={twitterShareUrl} aria-label="Twitter" hrefLang={lang} className="rounded-xl bg-black p-2">
          <Twitter fill="white" stroke="none" />
        </a>
        <a href={facebookShareUrl} aria-label="Facebook" hrefLang={lang} className="rounded-xl bg-black p-2">
          <Facebook fill="white" stroke="none" />
        </a>
        <a href={linkedinShareUrl} aria-label="Linkedin" hrefLang={lang} className="rounded-xl bg-black p-2">
          <Linkedin fill="white" stroke="none" />
        </a>
      </div>
    </div>
  )
}
