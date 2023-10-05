import { Locale } from "@/i18n/i18n"
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
  locale: Locale
  cardsOrientation?: "vertical" | "horizontal"
  columns?: number
}

export function ArticlesGrid({ articles, locale, cardsOrientation, columns = 3 }: ArtilcesGridProps) {
  if (!articles || articles.length === 0) return <p>No Articles Found!</p>
  const columnsStyle = `grid-cols-${columns}`
  return (
    <div className={`grid ${columnsStyle} gap-8`}>
      {articles.map((article) => {
        return (
          <ArticleCard
            orientation={cardsOrientation}
            key={`trending-${article.id}`}
            article={hygraphArticleToCardProps(article)}
            tagsPosition="under"
            locale={locale}
          />
        )
      })}
    </div>
  )
}
