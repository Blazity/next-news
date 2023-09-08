import { useHygraphClient } from "hygraphClient"
import { Locale } from "i18n"
import { Metadata } from "next/types"

type ArticlePageProps = { params: { lang: Locale; slug: string } }

export async function generateMetadata({ params: { lang, slug } }: ArticlePageProps): Promise<Metadata | null> {
  const { getArticleSummary } = useHygraphClient(lang)
  const { article } = await getArticleSummary({ slug })

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
  const { getArticleSummary } = useHygraphClient(lang)
  const article = await getArticleSummary({ slug })

  return (
    <>
      <section className="flex w-full justify-end gap-4 p-4">{JSON.stringify(article)}</section>
    </>
  )
}
