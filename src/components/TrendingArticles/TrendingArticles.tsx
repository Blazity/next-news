import { Locale } from "@/i18n/i18n"
import { formatDate } from "@/utils/formatDate"
import { getTrendingArticles } from "./getTrendingArticles"
import { ArticleCard } from "../ArticleCard/ArticleCard"
import { HeroArticleCard } from "../ArticleCard/HeroArticleCard"
import { ArticlesGrid } from "../ArticlesGrid/ArticlesGrid"
import { ArticleMinifiedCard } from "../ArticleCard/ArticleMinifiedCard"

type TrendingArticlesProps = {
  locale: Locale
}

export async function TrendingArticles({ locale }: TrendingArticlesProps) {
  const trendingArticles = await getTrendingArticles(locale)

  const [heroArticle, ...otherTrendingArticles] = trendingArticles
  const [mainArticle, ...secondaryArticles] = otherTrendingArticles.slice(0, 3)
  const minifiedArticles = otherTrendingArticles.slice(3, 12)

  return (
    <section className="w-full">
      {heroArticle && (
        <HeroArticleCard
          article={{
            tags: heroArticle.tags,
            imageUrl: heroArticle.image?.data.url,
            title: heroArticle.title,
            author: { name: heroArticle.author?.name ?? "Anonymous" },
            publicationDate: formatDate(heroArticle.publishedAt),
          }}
        />
      )}
      {otherTrendingArticles.length > 0 && (
        <>
          <h2 className="py-12 pb-8 text-3xl font-bold">Hot topics</h2>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 flex flex-col gap-5">
              {mainArticle && (
                <div className="h-[388px]">
                  <ArticleCard
                    article={{
                      tags: mainArticle.tags,
                      imageUrl: mainArticle.image?.data.url,
                      title: mainArticle.title,
                      author: { name: mainArticle.author?.name ?? "Anonymous" },
                      publicationDate: formatDate(mainArticle.publishedAt),
                    }}
                    tagsPosition="over"
                  />
                </div>
              )}
              {secondaryArticles.length > 0 && (
                <div className="flex h-[490px] gap-5">
                  {secondaryArticles.map((article) => {
                    return (
                      <ArticleCard
                        key={`trending-${article.id}`}
                        article={{
                          tags: article.tags,
                          imageUrl: article.image?.data.url,
                          title: article.title,
                          author: { name: article.author?.name ?? "Anonymous" },
                          publicationDate: formatDate(article.publishedAt),
                        }}
                        tagsPosition="under"
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
                      article={{ title: article.title, imageUrl: article.image?.data.url }}
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
