import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { useLocale } from "@/i18n/i18n"
import { listArticlesByCategory } from "@/lib/client"
import { CategoryArticlesInfiniteDynamic } from "./CategoryArticlesInfiniteDynamic"
import { getTranslations } from "@/i18n/setTranslations"

export const CATEGORY_ARTICLES_PER_PAGE = 4

type CategoryArticlesProps = {
  category: string
}

export async function CategoryArticles({ category }: CategoryArticlesProps) {
  const locale = useLocale()
  const translations = getTranslations()
  const articles = await listArticlesByCategory({
    locale: locale,
    categorySlug: category,
    first: CATEGORY_ARTICLES_PER_PAGE,
  })

  if (!articles) return notFound()
  return (
    <section className="w-full">
      <div className="mb-10 w-full border-b-[1px] py-14">
        <h2 className="mb-6 text-3xl font-bold">{translations.searchCategory}</h2>
        <p className="mb-2 text-xs">{`${translations.showing} ${articles.count} ${translations.resultsFor}`}</p>
        <p className="text-xl font-bold">&quot;{category}&quot;</p>
      </div>
      <div className="mx-auto w-full">
        <NextIntlClientProvider locale={locale}>
          <CategoryArticlesInfiniteDynamic category={category} initialArticles={articles} />
        </NextIntlClientProvider>
      </div>
    </section>
  )
}
