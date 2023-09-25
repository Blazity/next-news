import { Locale } from "@/i18n/i18n"
import { getRecentArticles } from "@/lib/client"
import { RecentArticlesInfiniteDynamic } from "./RecentArticlesInfiniteDynamic"

export const RECENT_ARTICLES_PER_PAGE = 4

type RecentArticlesProps = {
  locale: Locale
}

export async function RecentArticles({ locale }: RecentArticlesProps) {
  const initialArticles = await getRecentArticles({ locale, first: RECENT_ARTICLES_PER_PAGE })

  return (
    <section className="w-full px-4">
      <h2 className="mb-4 text-2xl font-bold">Recent articles</h2>
      <RecentArticlesInfiniteDynamic initialArticles={initialArticles} />
    </section>
  )
}
