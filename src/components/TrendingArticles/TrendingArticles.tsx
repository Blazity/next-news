import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"
import { getTrendingArticles } from "./getTrendingArticles"

type TrendingArticlesProps = {
  lang: Locale
}

export async function TrendingArticles({ lang }: TrendingArticlesProps) {
  const trendingArticles = await getTrendingArticles(lang)

  return (
    <section className="w-full px-4">
      <h2 className="mb-4 text-2xl font-bold">Trending articles</h2>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {trendingArticles.map((article) => {
          return (
            <Link
              href={`/${lang}/article/${article.slug}`}
              hrefLang={lang}
              prefetch={false}
              passHref
              key={`trending-${article.id}`}
            >
              <article className="flex flex-col gap-2">
                <div className="h-[157px] max-w-[300px] rounded-sm bg-slate-100">
                  {article.coverImage?.url && (
                    <Image
                      src={article.coverImage.url}
                      alt={article.title}
                      width={300}
                      height={157}
                      className="h-[157px] w-[300px] rounded-sm object-cover"
                    />
                  )}
                </div>
                <div className="font-semibold">{article.title}</div>
              </article>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
