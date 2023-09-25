import Image from "next/image"
import { notFound } from "next/navigation"
import { Metadata } from "next/types"
import { RichText } from "@/components/RichText/RichText"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"
import { getMatadataObj } from "@/utils/getMetadataObj"

type ArticlePageProps = { params: { slug: string; lang: Locale } }

export async function generateMetadata({ params: { slug, lang } }: ArticlePageProps): Promise<Metadata | null> {
  const { getArticleMetadataSummary } = HygraphApi({ lang })
  const { articles } = await getArticleMetadataSummary({ slug })
  const { seoComponent, image } = articles[0]

  const description = seoComponent?.description?.text
  const title = seoComponent?.title

  return getMatadataObj({ description, title, image })
}

export default async function Web({ params: { slug, lang } }: ArticlePageProps) {
  const { getArticleSummary } = HygraphApi({ lang })
  const { articles } = await getArticleSummary({ slug })
  const article = articles[0]

  const image = article?.image

  if (!article) return notFound()
  return (
    <article className="w-full px-4 pb-16 pt-8">
      {image && (
        <Image
          src={image.data?.url}
          alt={image?.description?.text ?? ""}
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
  )
}
