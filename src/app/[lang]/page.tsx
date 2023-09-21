import { RecentArticles } from "@/components/RecentArticles/RecentArticles"
import { StockDisplay } from "@/components/StockDisplay/StockDisplay"
import { TrendingArticles } from "@/components/TrendingArticles/TrendingArticles"
import { Locale } from "@/i18n/i18n"

export default async function Web({ params }: { params: { lang: Locale } }) {
  return (
    <>
      <div className="flex w-full justify-end px-4 pt-4">
        <StockDisplay />
      </div>
      <div className="flex w-full flex-col gap-16 pt-4">
        <TrendingArticles lang={params.lang} />
        <RecentArticles lang={params.lang} />
      </div>
    </>
  )
}
