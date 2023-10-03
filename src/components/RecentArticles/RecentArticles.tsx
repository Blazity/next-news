import { Locale } from "@/i18n/i18n"
import { getRecentArticles } from "@/lib/client"
import { RecentArticlesInfiniteDynamic } from "./RecentArticlesInfiniteDynamic"

export const RECENT_ARTICLES_PER_PAGE = 6

type RecentArticlesProps = {
  locale: Locale
  title: string
}

export async function RecentArticles({ locale, title }: RecentArticlesProps) {
  const initialArticles = await getRecentArticles({ locale, first: 4 })

  return (
    <section className="w-full">
      <h2 className="py-12 pb-8 text-3xl font-bold">{title}</h2>
      <RecentArticlesInfiniteDynamic initialArticles={initialArticles} />
    </section>
  )
}
