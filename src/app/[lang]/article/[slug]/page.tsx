import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next/types"
import { RecommendedArticles } from "@/components/RecommendedArticles/RecommendedArticles"
import { RichText } from "@/components/RichText/RichText"
import { Locale } from "@/i18n/i18n"
import { getArticleBySlug, getArticleMetadataBySlug } from "@/lib/client"
import { getMatadataObj } from "@/utils/getMetadataObj"

type ArticlePageProps = { params: { slug: string; lang: Locale } }

export async function generateMetadata({ params: { slug, lang } }: ArticlePageProps): Promise<Metadata | null> {
  const article = await getArticleMetadataBySlug({ locale: lang, slug })
  const { seoComponent, image } = article

  const description = seoComponent?.description?.text
  const title = seoComponent?.title

  return getMatadataObj({ description, title, image })
}

export default async function Web({ params: { slug, lang } }: ArticlePageProps) {
  const article = await getArticleBySlug({ locale: lang, slug })
  const categories = article?.categories

  if (!article) return notFound()
  return (
    <>
      <article className="w-full px-4 pb-16 pt-8">
        {article?.image && (
          <Image
            src={article.image?.data?.url}
            alt={article.image?.description?.text || ""}
            width={1200}
            height={630}
            quality={100}
            className="max-h-[630px] rounded-sm object-cover"
          />
        )}
        <h1 className="mb-8 text-2xl font-semibold">{article.title}</h1>
        {article.content && (
          <section className="flex w-full flex-col gap-4">
            <RichText raw={article.content.raw} />
          </section>
        )}
      </article>
      <nav className="w-full px-4 pt-8">
        <ul className="flex items-center justify-start gap-2">
          <li>Categories: </li>
          {categories.map((category) => (
            <li key={category.title}>
              <Link
                href={`/${lang}/category/${category.title}`}
                hrefLang={lang}
                className="rounded-md border px-5 py-3 hover:bg-slate-100"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {article.recommendedArticles.length > 0 && (
        <RecommendedArticles recommendedArticles={article.recommendedArticles} lang={lang} />
      )}
    </>
  )
}
