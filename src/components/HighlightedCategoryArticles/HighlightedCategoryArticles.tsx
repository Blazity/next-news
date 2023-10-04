import { Locale } from "@/i18n/i18n"
import { getRecentArticlesByCategory } from "@/lib/client"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"

export const RECENT_ARTICLES_PER_PAGE = 6

type RecentArticlesProps = {
  locale: Locale
  title: string
  categoryId: string
}

export async function HighlightedCategoryArticles({ locale, title, categoryId }: RecentArticlesProps) {
  const { articles } = await getRecentArticlesByCategory({ locale, first: 4, categoryId })

  return (
    <section className="w-full">
      <h2 className="py-12 pb-8 text-3xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 gap-5">
        {articles.map((article) => {
          return (
            <ArticleCard
              orientation="horizontal"
              key={`category-${article.id}`}
              article={hygraphArticleToCardProps(article)}
              locale={locale}
            />
          )
        })}
      </div>
    </section>
  )
}
