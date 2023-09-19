import { RecentArticlesInfiniteDynamic } from "./RecentArticlesInfiniteDynamic"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"

export const RECENT_ARTICLES_PER_PAGE = 4

type RecentArticlesProps = {
  lang: Locale
}

export async function RecentArticles({ lang }: RecentArticlesProps) {
  const { getRecentArticles } = HygraphApi({ lang })
  const initialArticles = await getRecentArticles({
    perPage: RECENT_ARTICLES_PER_PAGE,
  })

  return (
    <section className="w-full px-4">
      <h2 className="mb-4 text-2xl font-bold">Recent articles</h2>
      <RecentArticlesInfiniteDynamic initialArticles={initialArticles} />
    </section>
  )
}
