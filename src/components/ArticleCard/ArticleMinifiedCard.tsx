import Image from "next/image"

type ArticleMinifiedCardProps = {
  article: {
    imageUrl?: string
    title: string
  }
}

export function ArticleMinifiedCard({ article: { imageUrl, title } }: ArticleMinifiedCardProps) {
  return (
    <article className="flex w-full gap-5">
      <div className="relative h-[82px] w-[82px] rounded-xl bg-slate-900">
        {imageUrl && (
          <Image
            src={imageUrl}
            layout="responsive"
            alt="test"
            width={82}
            height={82}
            className=" max-h-[82px] rounded-xl object-cover text-center brightness-90"
          />
        )}
      </div>
      <div className="text-lg font-bold">{title}</div>
    </article>
  )
}
