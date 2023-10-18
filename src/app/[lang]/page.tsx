import { Metadata } from "next"
import { HighlightedArticles } from "@/components/HighlightedArticles/HighlightedArticles"
import { HighlightedCategoryArticles } from "@/components/HighlightedCategoryArticles/HighlightedCategoryArticles"
import { RecentArticles } from "@/components/RecentArticles/RecentArticles"
import { StockDisplay } from "@/components/StockDisplay/StockDisplay"
import { TrendingArticles } from "@/components/TrendingArticles/TrendingArticles"
import { i18n, Locale } from "@/i18n/i18n"
import { getHomepage, getHomepageMetadata } from "@/lib/client"
import { getMatadataObj } from "@/utils/getMetadataObj"
import { hygraphArticleToCardProps } from "@/components/ArticleCard/ArticleCard"
import { HeroArticleCard } from "@/components/ArticleCard/HeroArticleCard"

export const dynamicParams = false

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    lang: locale,
  }))
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata | null> {
  const { seoComponent } = await getHomepageMetadata(params.lang)
  return getMatadataObj({ title: seoComponent?.title, description: seoComponent?.description?.text })
}

export default async function Web({ params }: { params: { lang: Locale } }) {
  const homepage = await getHomepage(params.lang)

  return (
    <>
      {homepage.marketStock?.data && (
        <div className="flex w-full justify-end">
          <StockDisplay quotes={homepage.marketStock?.data} />
        </div>
      )}

      {homepage.heroArticle && (
        <HeroArticleCard article={hygraphArticleToCardProps(homepage.heroArticle)} locale={params.lang} asLink />
      )}
      <TrendingArticles locale={params.lang} title={homepage.trendingSectionTitle ?? "Trending articles"} />
      {homepage.highlightedArticles && (
        <HighlightedArticles
          locale={params.lang}
          title={homepage.highlightedSectionTitle ?? "Our picks"}
          articles={homepage.highlightedArticles}
        />
      )}
      {homepage.highlightedCategory && (
        <HighlightedCategoryArticles
          locale={params.lang}
          title={homepage.highlightedCategoryTitle ?? homepage.highlightedCategory.title}
          categoryId={homepage.highlightedCategory.id}
        />
      )}
      <RecentArticles locale={params.lang} title={homepage.recentSectionTitle ?? "Recent articles"} />
    </>
  )
}
