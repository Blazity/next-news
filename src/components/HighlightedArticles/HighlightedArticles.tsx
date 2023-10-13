import { GetHomepageQuery } from "@/gql/graphql"
import { Locale } from "@/i18n/i18n"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"

type HighlightedArticlesProps = {
  title: string
  locale: Locale
  articles: GetHomepageQuery["homepages"][0]["highlightedArticles"]
}

export async function HighlightedArticles({ title, articles, locale }: HighlightedArticlesProps) {
  return (
    <section className="w-full">
      <h2 className="py-12 pb-8 text-3xl font-bold">{title}</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {articles.map((article) => {
          return (
            <ArticleCard
              orientation="vertical"
              key={`highlighted-${article.id}`}
              article={hygraphArticleToCardProps(article)}
              locale={locale}
            />
          )
        })}
      </div>
    </section>
  )
}
