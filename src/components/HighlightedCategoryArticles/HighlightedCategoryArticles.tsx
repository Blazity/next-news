import { useLocale } from "@/i18n/i18n"
import { getRecentArticlesByCategory } from "@/lib/client"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"

export const RECENT_ARTICLES_PER_PAGE = 4

type RecentArticlesProps = {
  title: string
  categoryId: string
}

export async function HighlightedCategoryArticles({ title, categoryId }: RecentArticlesProps) {
  const locale = useLocale()
  const { articles } = await getRecentArticlesByCategory({ locale, first: RECENT_ARTICLES_PER_PAGE, categoryId })

  return (
    <section className="w-full">
      <h2 className="py-12 pb-8 text-3xl font-bold">{title}</h2>
      <div className="grid gap-5 lg:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard
            orientation="horizontal"
            key={`category-${article.id}`}
            article={hygraphArticleToCardProps(article)}
            lines="3"
          />
        ))}
      </div>
    </section>
  )
}
