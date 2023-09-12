import { RichText } from "components/RichText/RichText"
import { HygraphClient } from "hygraphClient"
import { Locale } from "i18n"
import Image from "next/image"
import { Metadata } from "next/types"

type ArticlePageProps = { params: { lang: Locale; slug: string } }

export async function generateMetadata({ params: { lang, slug } }: ArticlePageProps): Promise<Metadata | null> {
  const { getArticleSummary } = HygraphClient(lang)
  const { articles } = await getArticleSummary({ slug })
  const article = articles[0]

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
              url: `/api/og?` + new URLSearchParams({ title: article.title, image: article.coverImage.url }),
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

export default async function Web({ params: { lang, slug } }: ArticlePageProps) {
  const { getArticleSummary } = HygraphClient(lang)
  const { articles } = await getArticleSummary({ slug })
  const article = articles[0]

  if (!article) return null
  return (
    <article className="w-full px-4 pb-16">
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
