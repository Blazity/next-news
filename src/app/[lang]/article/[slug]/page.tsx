import { notFound } from "next/navigation"
import { Metadata } from "next/types"
import { HeroArticleCard } from "@/components/ArticleCard/HeroArticleCard"
import { RecommendedArticles } from "@/components/RecommendedArticles/RecommendedArticles"
import { RichText } from "@/components/RichText/RichText"
import { ShareOnSocial } from "@/components/ShareOnSocial/ShareOnSocial"
import { env } from "@/env.mjs"
import { Locale } from "@/i18n/i18n"
import { getArticleBySlug, getArticleMetadataBySlug } from "@/lib/client"
import { getMatadataObj } from "@/utils/getMetadataObj"

type ArticlePageProps = { params: { slug: string; lang: Locale } }

export async function generateMetadata({ params: { slug, lang } }: ArticlePageProps): Promise<Metadata | null> {
  const article = await getArticleMetadataBySlug({ locale: lang, slug })
  if (!article) return null
  const { seoComponent, image } = article

  const description = seoComponent?.description?.text
  const title = seoComponent?.title

  return getMatadataObj({ description, title, image })
}

export default async function Web({ params: { slug, lang } }: ArticlePageProps) {
  const article = await getArticleBySlug({ locale: lang, slug })
  const articleUrl = `${env.VERCEL_URL}/article/${slug}`
  const initialQuiz = article?.content?.references[0]

  if (!article) return notFound()

  const { image, publishedAt, title, tags, author } = article
  return (
    <>
      <article className="w-full pb-16 pt-8">
        <HeroArticleCard
          article={{
            imageUrl: image?.data?.url,
            publicationDate: publishedAt,
            title,
            author: { name: author?.name ?? "Anonymous" },
            tags,
            slug,
          }}
          locale={lang}
        />
        <ShareOnSocial lang={lang} articleUrl={articleUrl} articleTitle={title} />
        {article.content && (
          <section className="flex w-full flex-col gap-4 pt-8">
            <RichText references={initialQuiz ? [initialQuiz] : []} raw={article.content.raw} />
          </section>
        )}
      </article>
      {article.recommendedArticles.length > 0 && (
        <RecommendedArticles recommendedArticles={article.recommendedArticles} lang={lang} />
      )}
    </>
  )
}
