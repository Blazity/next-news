"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/Button/Button"
import { GetRecentArticlesQuery } from "@/gql/graphql"
import { useLocale } from "@/i18n/useLocale"
import { getRecentArticles } from "@/lib/client"
import { RECENT_ARTICLES_PER_PAGE } from "./RecentArticles"
import { ArticlesGrid } from "../ArticlesGrid/ArticlesGrid"

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

  return (
    <>
      <ArticlesGrid locale={locale} articles={articles} />
      {hasNextPage && (
        <Button className="mt-16 w-full bg-slate-100 p-4" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
          See more
        </Button>
      )}
    </>
  )
}

export default RecentArticlesInfinite
