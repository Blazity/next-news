import { notFound } from "next/navigation"
import { Locale } from "@/i18n/i18n"
import { listArticlesByCategory } from "@/lib/client"
import { CategoryArticlesInfiniteDynamic } from "./CategoryArticlesInfiniteDynamic"

export const CATEGORY_ARTICLES_PER_PAGE = 4

type CategoryArticlesProps = {
  category: string
  locale: Locale
}

export async function CategoryArticles({ locale, category }: CategoryArticlesProps) {
  const articles = await listArticlesByCategory({ locale: locale, slug: category })

  if (!articles) return notFound()
  return (
    <section className="w-full px-4">
      <h2 className="mb-4 text-2xl font-bold">Category {category} - Articles</h2>
      <CategoryArticlesInfiniteDynamic category={category} initialArticles={articles} />
    </section>
  )
}
