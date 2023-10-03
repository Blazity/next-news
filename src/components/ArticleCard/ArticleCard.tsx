import Image from "next/image"
import { ArticlePublishDetails } from "./ArticlePublishDetails"
import { TagButton } from "./Buttons/TagButton"
import { cn } from "@/utils/cn"

type ArticleCardProps = {
  article: {
    imageUrl?: string
    title: string
    publicationDate: Date | string
    tags: string[]
    author: {
      name: string
      imageUrl?: string
    }
  }
  tagsPosition?: "over" | "under"
}

export function ArticleCard({
  article: { imageUrl, title, publicationDate, author, tags },
  tagsPosition = "under",
}: ArticleCardProps) {
  return (
    <article className=" flex h-full max-h-[490px] w-full cursor-pointer flex-col overflow-hidden rounded-xl">
      <div className="relative h-[264px] bg-slate-900">
        {imageUrl && (
          <Image
            src={imageUrl}
            layout="responsive"
            alt="test"
            width={780}
            height={264}
            className=" max-h-[264px] object-cover text-center brightness-90"
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

      <div className="flex flex-1 flex-col rounded-b-xl border border-t-0 border-gray-200 bg-white">
        {tagsPosition === "under" && tags.length > 0 && (
          <div className="flex gap-2 p-6 pb-3">
            {tags.map((tag) => {
              return (
                <TagButton key={tag} variant="light">
                  {tag}
                </TagButton>
              )
            })}
          </div>
        )}
        <div className="flex flex-1 flex-col justify-end  gap-5  p-6 pt-3 ">
          <h2
            className={cn(
              tagsPosition === "under" && "min-h-[80px] ",
              "text-[1.8rem] font-bold leading-10 tracking-[1px]"
            )}
          >
            {title}
          </h2>
          <ArticlePublishDetails
            imageUrl={author.imageUrl}
            author={author.name}
            date={publicationDate}
            variant="light"
          />
        </div>
      </div>
    </article>
  )
}
