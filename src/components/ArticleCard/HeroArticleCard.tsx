import Image from "next/image"
import { ArticlePublishDetails } from "./ArticlePublishDetails"
import { TagButton } from "./Buttons/TagButton"

type HeroArticleCardProps = {
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
}

export function HeroArticleCard({ article: { imageUrl, title, publicationDate, author, tags } }: HeroArticleCardProps) {
  return (
    <article className=" w-full cursor-pointer overflow-hidden rounded-xl  text-white">
      <div className="relative h-[320px] bg-slate-900">
        {imageUrl && (
          <Image
            src={imageUrl}
            layout="responsive"
            alt="test"
            width={1200}
            height={320}
            className=" max-h-[320px] object-cover text-center brightness-90"
          />
        )}
        <div className="absolute inset-0 z-20 flex w-full flex-col items-start justify-between p-6 ">
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              {tags.map((tag) => {
                return <TagButton key={tag}>{tag}</TagButton>
              })}
            </div>
          </div>
          <div className="flex flex-col justify-around gap-5">
            <h2
              className=" text-[1.8rem] font-bold leading-10 tracking-[1px]"
              style={{ textShadow: "0px 1px 4px rgba(26, 26, 27, 1)" }}
            >
              {title}
            </h2>
            <ArticlePublishDetails imageUrl={author.imageUrl} author={author.name} date={publicationDate} />
          </div>
        </div>
      </div>
    </article>
  )
}
