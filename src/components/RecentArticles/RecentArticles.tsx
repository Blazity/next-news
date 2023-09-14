import { HygraphClient } from "hygraphClient"
import { Locale } from "i18n"
import { RecentArticlesInfiniteDynamic } from "./RecentArticlesInfiniteDynamic"

export const RECENT_ARTICLES_PER_PAGE = 4

export async function RecentArticles({ lang }: { lang: Locale }) {
  const { getRecentArticles } = HygraphClient(lang)
  const initialArticles = await getRecentArticles({ perPage: RECENT_ARTICLES_PER_PAGE })

  return (
    <section className="w-full px-4">
      <h2 className="mb-4 text-2xl font-bold">Recent articles</h2>
      <RecentArticlesInfiniteDynamic initialArticles={initialArticles} lang={lang} />
    </section>
  )
}
