import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"
import { cn } from "@/utils/cn"
import { ArticlePublishDetails } from "./ArticlePublishDetails"
import { Tag } from "./Buttons/Tag"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip/Tooltip"

type ArticleCardProps = {
  article: {
    imageUrl?: string
    title: string
    publicationDate: string | null
    tags: string[]
    slug: string
    author: {
      name: string
      imageUrl?: string
    }
  }
  tagsPosition?: "over" | "under"
  orientation?: "vertical" | "horizontal"
  locale: Locale
  lines?: "1" | "2" | "3"
}

export const hygraphArticleToCardProps = (article: {
  tags: string[]
  title: string
  author?: { name: string } | null
  image?: { data: { url: string } } | null
  publishedAt?: string
  slug: string
}) => {
  return {
    tags: article?.tags,
    imageUrl: article?.image?.data?.url,
    title: article?.title,
    author: { name: article?.author?.name ?? "Anonymous" },
    publicationDate: article?.publishedAt ? article.publishedAt : null,
    slug: article?.slug,
  }
}

const MAX_TAGS_TO_DISPLAY = 3

export function ArticleCard({
  article: { imageUrl, title, publicationDate, author, tags, slug },
  tagsPosition = "under",
  orientation = "vertical",
  lines = "2",
  locale,
}: ArticleCardProps) {
  const mainTag = tags[0]
  return (
    <Link href={`/${locale}/article/${slug}`} hrefLang={locale} passHref className="w-full">
      <article
        className={cn(
          orientation === "vertical" && "flex-col",
          orientation === "horizontal" && "flex-row",
          "flex h-full max-h-[490px] w-full cursor-pointer overflow-hidden rounded-xl"
        )}
      >
        <div
          className={cn(
            orientation === "horizontal" && "w-1/2 min-w-[204px]",
            "bg-gradient-to-brh-[264px] relative min-h-[264px] from-gray-200 to-gray-300"
          )}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="test"
              width={780}
              height={264}
              className={cn("h-[264px]  min-h-[264px] w-full object-cover text-center brightness-90")}
            />
          )}
          <div className="absolute inset-0 z-20 flex w-full flex-col items-start justify-end p-6 ">
            <div className="flex w-full flex-wrap justify-between">
              {tagsPosition === "over" && (
                <div className="flex gap-2">
                  {tags.slice(0, MAX_TAGS_TO_DISPLAY).map((tag) => {
                    return <Tag key={tag}>{tag}</Tag>
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-1 flex-col  border border-gray-200 bg-white",
            orientation === "vertical" && "rounded-b-xl border-t-0",
            orientation === "horizontal" && "rounded-r-xl border-l-0"
          )}
        >
          {tagsPosition === "under" && tags?.length > 0 && (
            <div className="flex  gap-2 p-5 pb-2">
              {mainTag && (
                <Tag key={mainTag} variant="light">
                  {mainTag}
                </Tag>
              )}
              {tags?.length > 1 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Tag variant="light">{`+${tags.length - 1}`}</Tag>
                  </TooltipTrigger>
                  <TooltipContent className="flex gap-2 bg-white" side="bottom">
                    {tags.slice(1).join(", ")}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
          <div className="flex flex-1 flex-col justify-between  gap-5  p-5 pt-2 ">
            <h2
              className={cn(
                tagsPosition === "under" && "min-h-[80px] ",
                lines === "1" && "line-clamp-1",
                lines === "2" && "line-clamp-2",
                lines === "3" && "line-clamp-3",
                "text-[1.5rem] font-bold leading-10 tracking-[1px]"
              )}
            >
              {title}
            </h2>
            <ArticlePublishDetails
              imageUrl={author.imageUrl}
              author={author.name}
              publicationDate={publicationDate}
              variant="light"
            />
          </div>
        </div>
      </article>
    </Link>
  )
}
