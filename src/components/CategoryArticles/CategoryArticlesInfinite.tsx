"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/Button/Button"
import { ListArticlesByCategoryQuery } from "@/gql/graphql"
import { useLocale } from "@/i18n/i18n"
import { listArticlesByCategory } from "@/lib/client"
import { ArticlesGrid } from "../ArticlesGrid/ArticlesGrid"

export type CategoryArticlesInfiniteProps = {
  initialArticles: { articles: ListArticlesByCategoryQuery["articles"]; count: number }
  category: string
  showMoreText: string | null | undefined
}

const CATEGORY_ARTICLES_PER_PAGE = 4

export function RecentArticlesInfinite({ initialArticles, category, showMoreText }: CategoryArticlesInfiniteProps) {
  const locale = useLocale()

  const {
    data: categoryArticlesQuery,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["category-articles", category],
    queryFn: ({ pageParam = 0 }) =>
      listArticlesByCategory({
        locale,
        categorySlug: category,
        skip: CATEGORY_ARTICLES_PER_PAGE * pageParam,
        first: CATEGORY_ARTICLES_PER_PAGE,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.count <= pages.length * CATEGORY_ARTICLES_PER_PAGE) return undefined
      return pages.length
    },
    initialData: {
      pages: [initialArticles],
      pageParams: [0],
    },
  })

  const articles = categoryArticlesQuery?.pages.flatMap((page) => page.articles)

  return (
    <>
      <ArticlesGrid cardsOrientation="horizontal" className="md:grid-cols-1 lg:grid-cols-2" articles={articles} />
      {hasNextPage && (
        <Button
          className="mt-16 w-full rounded-xl border p-4"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {showMoreText}
        </Button>
      )}
    </>
  )
}

export default RecentArticlesInfinite
