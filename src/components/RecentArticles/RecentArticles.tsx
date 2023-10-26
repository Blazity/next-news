import { NextIntlClientProvider } from "next-intl"
import { useLocale } from "@/i18n/i18n"
import { getRecentArticles } from "@/lib/client"
import { RecentArticlesInfiniteDynamic } from "./RecentArticlesInfiniteDynamic"

export const RECENT_ARTICLES_PER_PAGE = 6

type RecentArticlesProps = {
  title: string
}

export async function RecentArticles({ title }: RecentArticlesProps) {
  const locale = useLocale()
  const initialArticles = await getRecentArticles({ locale, first: 4 })

  return (
    <section className="w-full">
      <h2 className="py-12 pb-8 text-3xl font-bold">{title}</h2>
      <NextIntlClientProvider locale={locale}>
        <RecentArticlesInfiniteDynamic initialArticles={initialArticles} />
      </NextIntlClientProvider>
    </section>
  )
}
