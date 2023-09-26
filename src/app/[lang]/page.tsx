import { Metadata } from "next"
import { RecentArticles } from "@/components/RecentArticles/RecentArticles"
import { StockDisplay } from "@/components/StockDisplay/StockDisplay"
import { TrendingArticles } from "@/components/TrendingArticles/TrendingArticles"
import { i18n, Locale } from "@/i18n/i18n"
import { getHomepage, getHomepageMetadata } from "@/lib/client"
import { getMatadataObj } from "@/utils/getMetadataObj"

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
      <div className="flex w-full justify-end px-4 pt-4">
        <StockDisplay quotes={homepage.stockDailyQuotes} />
      </div>
      <div className="flex w-full flex-col gap-16 pt-4">
        <TrendingArticles locale={params.lang} />
        <RecentArticles locale={params.lang} />
      </div>
    </>
  )
}
