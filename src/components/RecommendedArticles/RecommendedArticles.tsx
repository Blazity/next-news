import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"

type imageInfo = {
  description?: { text: string } | null
  data: { url: string }
}

type RecommendedArticle = {
  title: string
  slug: string
  id: string
  image?: imageInfo | null
}

type RecommendedArticlesProps = { recommendedArticles: RecommendedArticle[]; lang: Locale }

export async function RecommendedArticles({ recommendedArticles, lang }: RecommendedArticlesProps) {
  return (
    <section className="w-full px-4">
      <h2 className="mb-4 text-2xl font-bold">Recommended articles</h2>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {recommendedArticles?.map((article) => (
          <Link
            href={`/${lang}/article/${article.slug}`}
            hrefLang={lang}
            prefetch={false}
            passHref
            key={`recommended-${article.id}`}
          >
            <article className="flex flex-col gap-2">
              <div className="h-[157px] max-w-[300px] rounded-sm bg-slate-100">
                {article.image?.data.url && (
                  <Image
                    src={article.image?.data?.url}
                    alt={article.image?.description?.text || ""}
                    width={300}
                    height={157}
                    className="h-[157px] w-[300px] rounded-sm object-cover"
                  />
                )}
              </div>
              <div className="font-semibold">{article?.title}</div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
