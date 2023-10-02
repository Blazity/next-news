import Image from "next/image"
import { ArticlePublishDetails } from "../ArticlePublishDetails/ArticlePublishDetails"
import { LiveButton } from "../Buttons/LiveButton/LiveButton"
import { PlayButton } from "../Buttons/PlayButton/PlayButton"
import { TagButton } from "../Buttons/TagButton/TagButton"

type HeroImageProps = {
  imageUrl: string
  title: string
  publicationDate: Date | string
  author: string
  authorImageUrl: string
}

export function HeroImage({ imageUrl, title, publicationDate, author, authorImageUrl }: HeroImageProps) {
  return (
    <section className="relative mt-3 w-full overflow-hidden rounded-xl">
      <div className="absolute inset-0 z-10 bg-black opacity-20" />
      <Image src={imageUrl} layout="responsive" alt="test" width={1200} height={700} />
      <div className="absolute inset-0 z-20 flex w-full flex-col items-start justify-between p-6 text-white">
        <div className="flex w-full justify-between">
          <div className="flex gap-2">
            <TagButton>Tagging</TagButton>
            <TagButton>Tagging</TagButton>
            <TagButton>Tagging</TagButton>
          </div>
          <div className="flex items-center justify-center gap-2">
            <LiveButton>LIVE</LiveButton>
            <PlayButton />
          </div>
        </div>
        <div className="flex flex-col justify-around gap-5">
          <h2 className="text-[1.8rem] font-bold leading-10 tracking-[1px]">{title}</h2>
          <ArticlePublishDetails imageUrl={authorImageUrl} author={author} date={publicationDate} />
        </div>
      </div>
    </section>
  )
}
