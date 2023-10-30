import { cn } from "@/utils/cn"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"

type Nullable<T extends object> = T | null

type ImageDescription =
  | {
      text: string
    }
  | null
  | undefined

type ImageData = { url: string }

type Article = {
  id: string
  slug: string
  title: string
  tags: string[]
  image?: Nullable<{
    description?: ImageDescription
    data: ImageData
  }>
}

type Articles = Article[] | undefined | null

type ArtilcesGridProps = {
  articles: Articles
  cardsOrientation?: "vertical" | "horizontal"
  className?: string
}

export function ArticlesGrid({ articles, cardsOrientation, className }: ArtilcesGridProps) {
  if (!articles || articles.length === 0) return <p>No Articles Found!</p>
  return (
    <div className={cn(`grid gap-8 md:grid-cols-3`, className)}>
      {articles.map((article) => {
        return (
          <ArticleCard
            orientation={cardsOrientation}
            key={`trending-${article.id}`}
            article={hygraphArticleToCardProps(article)}
            tagsPosition="under"
          />
        )
      })}
    </div>
  )
}
