import { Locale } from "@/i18n/i18n"
import { ArticlesGrid } from "../ArticlesGrid/ArticlesGrid"

type imageInfo = {
  description?: { text: string } | null
  data: { url: string }
}

export type RecommendedArticle = {
  tags: string[]
  title: string
  slug: string
  id: string
  image?: imageInfo | null
}

type RecommendedArticlesProps = { recommendedArticles: RecommendedArticle[]; lang: Locale }

export async function RecommendedArticles({ recommendedArticles, lang }: RecommendedArticlesProps) {
  return (
    <section className="w-full py-4">
      <h2 className="mb-8 text-2xl font-bold">Related articles</h2>
      <ArticlesGrid locale={lang} articles={recommendedArticles} />
    </section>
  )
}
