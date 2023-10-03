import Image from "next/image"
import { cn } from "@/utils/cn"
import { formatDate } from "@/utils/formatDate"
import { ArticlePublishDetails } from "./ArticlePublishDetails"
import { TagButton } from "./Buttons/TagButton"

type ArticleCardProps = {
  article: {
    imageUrl?: string
    title: string
    publicationDate: string | null
    tags: string[]
    author: {
      name: string
      imageUrl?: string
    }
  }
  tagsPosition?: "over" | "under"
  orientation?: "vertical" | "horizontal"
}

export const hygraphArticleToCardProps = (article: {
  tags: string[]
  title: string
  author?: { name: string } | null
  image?: { data: { url: string } } | null
  publishedAt?: string
}) => {
  return {
    tags: article.tags,
    imageUrl: article.image?.data.url,
    title: article.title,
    author: { name: article.author?.name ?? "Anonymous" },
    publicationDate: article.publishedAt ? formatDate(article.publishedAt) : null,
  }
}

export function ArticleCard({
  article: { imageUrl, title, publicationDate, author, tags },
  tagsPosition = "under",
  orientation = "vertical",
}: ArticleCardProps) {
  return (
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
          "relative h-[264px] min-h-[264px] bg-gradient-to-br from-gray-200 to-gray-300"
        )}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            layout="responsive"
            alt="test"
            width={780}
            height={264}
            className=" h-full max-h-[264px]  min-h-[264px] object-cover text-center brightness-90"
          />
        )}
        <div className="absolute inset-0 z-20 flex w-full flex-col items-start justify-end p-6 ">
          <div className="flex w-full justify-between">
            {tagsPosition === "over" && (
              <div className="flex gap-2">
                {tags.map((tag) => {
                  return <TagButton key={tag}>{tag}</TagButton>
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
        {tagsPosition === "under" && tags.length > 0 && (
          <div className="flex gap-2 p-5 pb-2">
            {tags.map((tag) => {
              return (
                <TagButton key={tag} variant="light">
                  {tag}
                </TagButton>
              )
            })}
          </div>
        )}
        <div className="flex flex-1 flex-col justify-end  gap-5  p-5 pt-2 ">
          <h2
            className={cn(
              tagsPosition === "under" && "min-h-[80px] ",
              "line-clamp-2 text-[1.8rem] font-bold leading-10 tracking-[1px]"
            )}
          >
            {title}
          </h2>
          <ArticlePublishDetails
            imageUrl={author.imageUrl}
            author={author.name}
            formatedDate={publicationDate}
            variant="light"
          />
        </div>
      </div>
    </article>
  )
}
