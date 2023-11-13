import { useLocale } from "@/i18n/i18n"
import { getRecentArticlesWithMain } from "@/lib/client"
import { RecentArticlesInfiniteDynamic } from "./RecentArticlesInfiniteDynamic"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"

export const RECENT_ARTICLES_PER_PAGE = 6

type RecentArticlesProps = {
  title: string
}

export async function RecentArticles({ title }: RecentArticlesProps) {
  const locale = useLocale()
  const initialArticles = await getRecentArticlesWithMain({ locale, first: 3, skip: 1 })
  const mainArticle = initialArticles.mainArticle[0]

  return (
    <section className="w-full">
      <h2 className="py-12 pb-8 text-3xl font-bold">{title}</h2>
      <div className="pb-5">
        <ArticleCard
          article={hygraphArticleToCardProps(mainArticle)}
          orientation="horizontal"
          imageClassName="lg:w-1/2"
          tagsPosition="over"
        />
      </div>
      <RecentArticlesInfiniteDynamic initialArticles={initialArticles} />
    </section>
  )
}
