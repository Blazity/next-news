import { RecentArticles } from "@/components/RecentArticles/RecentArticles"
import { StockDisplay } from "@/components/StockDisplay/StockDisplay"
import { Locale } from "@/i18n/i18n"


export default async function Web({ params }: { params: { lang: Locale } }) {
  return (
    <>
      <div className="flex w-full justify-end px-4 pt-4">
        <StockDisplay />
      </div>
      <RecentArticles lang={params.lang} />
    </>
  )
}
