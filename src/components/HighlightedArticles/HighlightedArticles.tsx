import { GetHomepageQuery } from "@/gql/graphql"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"

type HighlightedArticlesProps = {
  title: string
  articles: GetHomepageQuery["homepages"][0]["highlightedArticles"]
}

export async function HighlightedArticles({ title, articles }: HighlightedArticlesProps) {
  return (
    <section className="w-full">
      <h2 className="py-12 pb-8 text-3xl font-bold">{title}</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {articles.map((article) => {
          return (
            <ArticleCard
              orientation="vertical"
              key={`highlighted-${article.id}`}
              tagsPosition="over"
              lines={"2"}
              article={hygraphArticleToCardProps(article)}
            />
          )
        })}
      </div>
    </section>
  )
}
