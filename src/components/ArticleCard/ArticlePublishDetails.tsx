import Image from "next/image"
import { useLocale } from "@/i18n/i18n"
import { cn } from "@/utils/cn"
import { formatDate } from "@/utils/formatDate"

type ArticlePublishDetailsProps = {
  className?: string
  author: string
  publicationDate: string | null | Date
  imageUrl?: string
  variant?: "dark" | "light"
}

export function ArticlePublishDetails({
  author,
  publicationDate,
  imageUrl,
  variant = "dark",
  className = "",
}: ArticlePublishDetailsProps) {
  const locale = useLocale()
  return (
    <div
      className={cn(
        variant === "dark" && " text-custom-dim",
        variant === "light" && " text-gray-500",
        "flex items-center gap-2 whitespace-nowrap text-center text-sm",
        className
      )}
      style={{ textShadow: variant === "dark" ? "0px 1px 2px rgba(26, 26, 27, 1)" : undefined }}
    >
      {publicationDate && (
        <>
          <p>{formatDate(publicationDate, locale)}</p>
          <p>|</p>
        </>
      )}
      <p>{author}</p>
      {imageUrl && <Image src={imageUrl} alt="author" width={24} height={24} className="rounded-full" />}
    </div>
  )
}
