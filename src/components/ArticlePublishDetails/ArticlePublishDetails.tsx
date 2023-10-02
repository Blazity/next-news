import Image from "next/image"
import { formatDate } from "@/utils/formatDate"

type ArticlePublishDetailsProps = {
  author: string
  date: Date | string
  imageUrl: string
}

export function ArticlePublishDetails({ author, date, imageUrl }: ArticlePublishDetailsProps) {
  return (
    <div className="flex items-center gap-2 text-center text-sm text-custom-dim">
      <p>{formatDate(date)}</p>
      <p>|</p>
      <p>{author}</p>
      <Image src={imageUrl} alt="author" width={24} height={24} className="rounded-full" />
    </div>
  )
}
