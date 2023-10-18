import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"

type ArticleMinifiedCardProps = {
  article: {
    imageUrl?: string
    title: string
    slug: string
  }
  locale: Locale
}

export function ArticleMinifiedCard({ article: { imageUrl, title, slug }, locale }: ArticleMinifiedCardProps) {
  return (
    <a href={`/${locale}/article/${slug}`} hrefLang={locale}>
      <article className="flex w-full gap-5">
        <div className="relative h-[82px] min-w-[82px] rounded-xl bg-gradient-to-br from-gray-200 to-gray-300">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={82}
              height={82}
              className=" min-h-[82px] rounded-xl object-cover text-center brightness-90"
            />
          )}
        </div>
        <div className="line-clamp-3 text-lg font-bold">{title}</div>
      </article>
    </a>
  )
}
