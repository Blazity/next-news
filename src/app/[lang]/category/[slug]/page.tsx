import { Metadata } from "next/types"
import { CategoryArticles } from "@/components/CategoryArticles/CategoryArticles"
import { Locale } from "@/i18n/i18n"
import { getMatadataObj } from "@/utils/getMetadataObj"

type ArticlePageProps = { params: { slug: string; lang: Locale } }

export async function generateMetadata({ params: { slug } }: ArticlePageProps): Promise<Metadata | null> {
  return getMatadataObj({ title: `Category - ${slug}` })
}

export default async function Web({ params: { slug, lang } }: ArticlePageProps) {
  return <CategoryArticles category={slug} locale={lang} />
}
