import Image from "next/image"
import { notFound } from "next/navigation"
import { Metadata } from "next/types"
import { RichText } from "@/components/RichText/RichText"
import { Locale } from "@/i18n/i18n"
import { getArticleBySlug } from "@/lib/client"

type ArticlePageProps = { params: { slug: string; lang: Locale } }

export async function generateMetadata({ params: { slug, lang } }: ArticlePageProps): Promise<Metadata | null> {
  const article = await getArticleBySlug({ locale: lang, slug })

  if (!article) return null
  return {
    title: article.title,
    openGraph: {
      type: "article",
      authors: article.author ? article.author.name : null,
      url: "https://next-enterprise.vercel.app/",
      title: article.title,
      images: article.coverImage
        ? [
            {
              url:
                `/api/og?` +
                new URLSearchParams({
                  title: article.title,
                  image: article.coverImage.url,
                }),
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
    },
  }
}

export default async function Web({ params: { slug, lang } }: ArticlePageProps) {
  const article = await getArticleBySlug({ locale: lang, slug })

  if (!article) return notFound()
  return (
    <article className="w-full px-4 pb-16 pt-8">
      {article.coverImage && (
        <Image
          src={article.coverImage.url}
          alt={""}
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
