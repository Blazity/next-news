import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/i18n/i18n"
import { ArticlePublishDetails } from "./ArticlePublishDetails"
import { Tag } from "./Buttons/Tag"

type HeroArticleCardProps = {
  article: {
    imageAlt?: string
    imageUrl?: string
    title: string
    publicationDate: string | null
    tags: string[]
    author: {
      name: string
      imageUrl?: string
    }
    slug: string
  }
  asLink?: boolean
  additionalLink?: string
}

export function HeroArticleCard({
  article: { imageUrl, imageAlt, title, publicationDate, author, tags, slug },
  asLink = true,
  additionalLink,
}: HeroArticleCardProps) {
  const locale = useLocale()

  return (
    <div className=" relative w-full overflow-hidden  rounded-xl text-white">
      <div className="relative h-[320px] bg-slate-900">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt ?? "lack of description"}
            width={1200}
            height={320}
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 480px, (max-width: 1200px) 780px, 1200px"
            className="h-full max-h-[320px] object-cover text-center brightness-90"
            priority
          />
        )}
        <div className="absolute inset-0 z-20 flex w-full flex-col items-start justify-between p-6 ">
          {asLink && (
            <Link href={`/${locale}/article/${slug}`} className="absolute inset-0 z-[z-21]" hrefLang={locale} />
          )}
          <div className="flex w-full justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                return <Tag key={tag}>{tag}</Tag>
              })}
            </div>
          </div>
          <div className="flex flex-col justify-around gap-5">
            <h2
              className=" text-[1.8rem] font-bold leading-7 tracking-[1px] md:leading-10"
              style={{ textShadow: "0px 1px 4px rgba(26, 26, 27, 1)" }}
            >
              {title}
            </h2>
            <ArticlePublishDetails
              link={additionalLink}
              imageUrl={author.imageUrl}
              author={author.name}
              publicationDate={publicationDate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
