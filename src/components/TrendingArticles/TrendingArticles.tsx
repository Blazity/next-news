import { Locale } from "@/i18n/i18n"
import { getTrendingArticles } from "./getTrendingArticles"
import { ArticlesGrid } from "../ArticlesGrid/ArticlesGrid"

type TrendingArticlesProps = {
  locale: Locale
}

export async function TrendingArticles({ locale }: TrendingArticlesProps) {
  const trendingArticles = await getTrendingArticles(locale)

  return (
    <section className="w-full px-4">
      <h2 className="mb-4 text-2xl font-bold">Trending articles</h2>
      <ArticlesGrid locale={locale} articles={trendingArticles} />
    </section>
  )
}
