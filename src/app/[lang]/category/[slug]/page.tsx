import { notFound } from "next/navigation"
import { Metadata } from "next/types"
import { CategoryArticles } from "@/components/CategoryArticles/CategoryArticles"
import { Locale } from "@/i18n/i18n"
import { getArticlesTranslationByCategory, listArticlesByCategory } from "@/lib/client"
import { getMatadataObj } from "@/utils/getMetadataObj"

type ArticlePageProps = { params: { slug: string; lang: Locale } }

export async function generateMetadata({ params: { slug } }: ArticlePageProps): Promise<Metadata | null> {
  return getMatadataObj({ title: `Category - ${slug}` })
}

export default async function Web({ params: { slug, lang } }: ArticlePageProps) {
  const [articles, translations] = await Promise.all([
    listArticlesByCategory({
      locale: lang,
      categorySlug: slug,
      first: 4,
    }),
    getArticlesTranslationByCategory(lang),
  ])
  if (!articles) return notFound()
  return <CategoryArticles articles={articles} translations={translations} category={slug} />
}
