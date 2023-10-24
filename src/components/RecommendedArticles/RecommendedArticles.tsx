"use client"

import { useQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import { Locale } from "@/i18n/i18n"
import { getArticleRecommendedArticles } from "@/lib/client"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"

type RecommendedArticlesProps = { id: string }

export function RecommendedArticles({ id }: RecommendedArticlesProps) {
  const locale = useLocale() as Locale;
  const { data: recommendedArticles, isLoading } = useQuery({
    queryKey: [`recommended-articles`, id],
    queryFn: () => getArticleRecommendedArticles({ locale, id }),
  })

  if (!isLoading && recommendedArticles?.length === 0) return null
  return (
    <section className="w-full py-4">
      <h2 className="mb-8 text-2xl font-bold">Related articles</h2>
      <div className={`grid gap-8 md:grid-cols-3`}>
        {isLoading &&
          Array.from(Array(3).keys()).map((idx) => {
            return <ArticleSkeleton key={`skeleton-${idx}`} />
          })}
        {!isLoading &&
          recommendedArticles?.map((article) => {
            return (
              <ArticleCard
                key={`trending-${article.id}`}
                article={hygraphArticleToCardProps(article)}
                tagsPosition="under"
              />
            )
          })}
      </div>
    </section>
  )
}

function ArticleSkeleton() {
  return <div className=" h-[481px] animate-pulse rounded-xl bg-gray-100"></div>
}
