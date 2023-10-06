import { Locale } from "@/i18n/i18n"
import { getTrendingArticles } from "./getTrendingArticles"
import { ArticleCard, hygraphArticleToCardProps } from "../ArticleCard/ArticleCard"
import { ArticleMinifiedCard } from "../ArticleCard/ArticleMinifiedCard"
import { HeroArticleCard } from "../ArticleCard/HeroArticleCard"
import { cn } from "@/utils/cn"

type TrendingArticlesProps = {
  locale: Locale
  title: string
}

export async function TrendingArticles({ locale, title }: TrendingArticlesProps) {
  const trendingArticles = await getTrendingArticles(locale)

  const [heroArticle, ...otherTrendingArticles] = trendingArticles
  const [mainArticle, ...secondaryArticles] = otherTrendingArticles.slice(0, 3)
  const minifiedArticles = otherTrendingArticles.slice(3, 12)

  const isTwoRowLayout = minifiedArticles.length > 0
  console.log(minifiedArticles, isTwoRowLayout)

  return (
    <section className="w-full">
      {heroArticle && <HeroArticleCard article={hygraphArticleToCardProps(heroArticle)} locale={locale} />}
      {otherTrendingArticles.length > 0 && (
        <>
          <h2 className="py-12 pb-8 text-3xl font-bold">{title}</h2>
          <div className={cn(isTwoRowLayout ? "grid-cols-3" : "grid-cols-2", "grid  gap-5")}>
            <div className="col-span-2 flex flex-col gap-5">
              {mainArticle && (
                <div className="h-[388px]">
                  <ArticleCard
                    article={hygraphArticleToCardProps(mainArticle)}
                    tagsPosition="over"
                    locale={locale}
                    lines={"1"}
                  />
                </div>
              )}
              {secondaryArticles.length > 0 && (
                <div className="flex h-[490px] gap-5">
                  {secondaryArticles.map((article) => {
                    return (
                      <ArticleCard
                        key={`trending-${article.id}`}
                        article={hygraphArticleToCardProps(article)}
                        tagsPosition="under"
                        locale={locale}
                      />
                    )
                  })}
                </div>
              )}
            </div>

            {minifiedArticles.length > 0 && (
              <div className="col-span-1 flex flex-col gap-5">
                {minifiedArticles.map((article) => {
                  return (
                    <ArticleMinifiedCard
                      key={`trending-${article.id}`}
                      article={{ title: article.title, imageUrl: article.image?.data.url, slug: article.slug }}
                      locale={locale}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}
