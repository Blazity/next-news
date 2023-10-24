import { Metadata } from "next"
import { hygraphArticleToCardProps } from "@/components/ArticleCard/ArticleCard"
import { HeroArticleCard } from "@/components/ArticleCard/HeroArticleCard"
import { HighlightedArticles } from "@/components/HighlightedArticles/HighlightedArticles"
import { HighlightedCategoryArticles } from "@/components/HighlightedCategoryArticles/HighlightedCategoryArticles"
import { RecentArticles } from "@/components/RecentArticles/RecentArticles"
import { StockDisplay } from "@/components/StockDisplay/StockDisplay"
import { TrendingArticles } from "@/components/TrendingArticles/TrendingArticles"
import { i18n, Locale } from "@/i18n/i18n"
import { getHomepage, getHomepageMetadata } from "@/lib/client"
import { getMatadataObj } from "@/utils/getMetadataObj"

export const dynamicParams = false

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata | null> {
  const { seoComponent } = await getHomepageMetadata(params.lang)
  return getMatadataObj({ title: seoComponent?.title, description: seoComponent?.description?.text })
}

export default async function Web({ params }: { params: { lang: Locale } }) {
  const homepage = await getHomepage(params.lang)

  return (
    <>
      {homepage.marketStock?.data && <StockDisplay quotes={homepage.marketStock?.data} />}

      {homepage.heroArticle && <HeroArticleCard article={hygraphArticleToCardProps(homepage.heroArticle)} asLink />}
      <TrendingArticles title={homepage.trendingSectionTitle ?? "Trending articles"} />
      {homepage.highlightedArticles && (
        <HighlightedArticles
          title={homepage.highlightedSectionTitle ?? "Our picks"}
          articles={homepage.highlightedArticles}
        />
      )}
      {homepage.highlightedCategory && (
        <HighlightedCategoryArticles
          title={homepage.highlightedCategoryTitle ?? homepage.highlightedCategory.title}
          categoryId={homepage.highlightedCategory.id}
        />
      )}
      <RecentArticles title={homepage.recentSectionTitle ?? "Recent articles"} />
    </>
  )
}
