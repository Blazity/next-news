"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/Button/Button"
import { GetRecentArticlesQuery } from "@/gql/graphql"
import { useLocale } from "@/i18n/useLocale"
import { getRecentArticles } from "@/lib/client"
import { RECENT_ARTICLES_PER_PAGE } from "./RecentArticles"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"

export type RecentArticlesInfiniteProps = {
  initialArticles: { articles: GetRecentArticlesQuery["articles"]; count: number }
}

export function RecentArticlesInfinite({ initialArticles }: RecentArticlesInfiniteProps) {
  const locale = useLocale()

  const {
    data: recentArticlesQuery,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["recent-articles"],
    queryFn: ({ pageParam = 0 }) =>
      getRecentArticles({
        locale,
        skip: RECENT_ARTICLES_PER_PAGE * pageParam,
        first: RECENT_ARTICLES_PER_PAGE,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.count <= pages.length * RECENT_ARTICLES_PER_PAGE) return undefined
      return pages.length
    },
    initialData: {
      pages: [initialArticles],
      pageParams: [0],
    },
  })

  const articles = recentArticlesQuery?.pages.flatMap((page) => page.articles)
  if (!articles) return null
  const [firstArticle, ...otherArticles] = articles

  return (
    <section className="flex flex-col gap-5">
      <ArticleCard
        article={hygraphArticleToCardProps(firstArticle)}
        orientation="horizontal"
        locale={locale}
        imageClassName="md:w-1/2"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {otherArticles.map((article) => {
          return (
            <ArticleCard key={`recent-${article.id}`} article={hygraphArticleToCardProps(article)} locale={locale} />
          )
        })}
      </div>
      {hasNextPage && (
        <Button className="w-full rounded-xl border p-4" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
          See more
        </Button>
      )}
    </section>
  )
}

export default RecentArticlesInfinite
