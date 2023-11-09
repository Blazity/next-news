import { NextIntlClientProvider } from "next-intl"
import { useLocale } from "@/i18n/i18n"
import { getArticlesTranslationByCategory, listArticlesByCategory } from "@/lib/client"
import { CategoryArticlesInfiniteDynamic } from "./CategoryArticlesInfiniteDynamic"

type CategoryArticlesProps = {
  category: string
  translations: Awaited<ReturnType<typeof getArticlesTranslationByCategory>>
  articles: Awaited<ReturnType<typeof listArticlesByCategory>>
}

export async function CategoryArticles({
  category,
  translations,
  articles: { articles, count },
}: CategoryArticlesProps) {
  const locale = useLocale()
  return (
    <section className="w-full">
      <div className="mb-10 w-full border-b-[1px] py-14">
        <h2 className="mb-6 text-3xl font-bold">{translations?.searchCategory}</h2>
        <p className="mb-2 text-xs">
          {translations?.showing} {count} {translations?.resultsFor}:{" "}
        </p>
        <p className="text-xl font-bold">&quot;{category}&quot;</p>
      </div>
      <div className="mx-auto w-full">
        <NextIntlClientProvider locale={locale}>
          <CategoryArticlesInfiniteDynamic
            category={category}
            showMoreText={translations?.showMore}
            initialArticles={{ articles, count }}
          />
        </NextIntlClientProvider>
      </div>
    </section>
  )
}
