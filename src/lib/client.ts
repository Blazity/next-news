import { env } from "@/env.mjs"
import { Locale, standardNotationToHygraphLocale } from "@/i18n/i18n"
import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { print } from "graphql"
import omit from "lodash/omit"
import pThrottle from "p-throttle"
import {
  getArticleBySlugQuery,
  getArticleMetadataBySlugQuery,
  getArticleRecommendedArticlesQuery,
  getArticlesQuantityQuery,
  getRecentArticlesQuery,
  getRecentArticlesWithMainQuery,
  listArticlesByCategoryQuery,
  listArticlesBySlugQuery,
  listArticlesForSitemapQuery,
} from "./queries/articles"
import { getHomepageMetadataQuery, getHomepageQuery, getNavigationQuery } from "./queries/components"
import { getPageBySlugQuery, getPageMetadataBySlugQuery, listPagesForSitemapQuery } from "./queries/pages"
import { getQuizQuestionsByIdQuery } from "./queries/quizes"
import { Tag } from "./tags"
import { getGlobalTranslationsQuery } from "./queries/translations"

const throttle = pThrottle({
  limit: 5, //Community: 5req/sec
  interval: 1000,
})
export async function graphqlFetch<TQuery, TVariables>({
  cache = "force-cache",
  headers,
  document,
  variables,
  revalidate,
  tags,
}: {
  cache?: RequestCache
  revalidate?: number
  headers?: HeadersInit
  document: TypedDocumentNode<TQuery, TVariables>
  variables?: Omit<TVariables, "locales"> & { locale?: Locale }
  tags?: Tag[]
}): Promise<TQuery> {
  const variablesWithoutLocale = omit(variables, "locale")
  const localeFromVariables = variables?.locale

  const throttledFetch = throttle(() =>
    fetch(env.NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        query: print(document),
        ...(variables && {
          variables: {
            ...(localeFromVariables && { locales: [standardNotationToHygraphLocale(localeFromVariables)] }),
            ...variablesWithoutLocale,
          },
        }),
      }),
      ...(!revalidate && { cache }),
      ...((tags || revalidate) && { next: { ...(tags && { tags }), ...(revalidate && { revalidate }) } }),
    })
  )
  const fetchWithRetry = async (repeats: number): Promise<Response> => {
    const result = await throttledFetch()
    if (result.status === 429 && repeats > 0) return await fetchWithRetry(repeats - 1)
    return result
  }

  const result = await fetchWithRetry(3)

  const parsed = (await result.json()) as { data: TQuery; errors?: unknown }
  if (!result.ok || parsed.errors) throw Error(JSON.stringify({ status: result.status, errors: parsed.errors }))
  return parsed.data
}

export async function getHomepage(locale: Locale) {
  const { homepages, marketStock } = await graphqlFetch({
    document: getHomepageQuery,
    tags: ["HOMEPAGE", "CATEGORY", "ARTICLE"],
    variables: { locale },
    revalidate: 60 * 60 * 6, // 6h
  })
  return { ...homepages[0], marketStock }
}

export async function getHomepageMetadata(locale: Locale) {
  const { homepages } = await graphqlFetch({
    cache: "force-cache",
    document: getHomepageMetadataQuery,
    tags: ["HOMEPAGE", "CATEGORY", "ARTICLE"],
    variables: { locale },
  })
  return homepages[0] ?? null
}

export async function getNavigation(locale: Locale) {
  const { navigations, footers, asset } = await graphqlFetch({
    cache: "force-cache",
    document: getNavigationQuery,
    tags: ["NAVIGATION", "PAGE", "CATEGORY"],
    variables: { locale },
  })

  return { navigation: navigations[0] ?? null, footer: footers[0] ?? null, logo: asset ?? null }
}

export async function getArticlesQuantity(locale: Locale) {
  const { articlesConnection } = await graphqlFetch({
    cache: "force-cache",
    document: getArticlesQuantityQuery,
    tags: ["ARTICLE"],
    variables: { locale },
  })
  return articlesConnection.aggregate.count ?? 0
}

export async function listArticlesForSitemap(variables: { locale: Locale; skip?: number; first?: number }) {
  const { articles } = await graphqlFetch({
    cache: "force-cache",
    document: listArticlesForSitemapQuery,
    tags: ["ARTICLE"],
    variables,
  })
  return articles
}

export async function getRecentArticlesByCategory(variables: {
  locale: Locale
  skip?: number
  first?: number
  categoryId: string
}) {
  const { categoryId, ...variablesInput } = variables
  const { articles, articlesConnection } = await graphqlFetch({
    cache: "force-cache",
    document: getRecentArticlesQuery,
    tags: ["ARTICLE"],
    variables: { ...variablesInput, where: { categories_some: { id: categoryId } } },
  })
  return { articles, count: articlesConnection.aggregate.count }
}

export async function getRecentArticles(variables: { locale: Locale; skip?: number; first?: number }) {
  const { articles, articlesConnection } = await graphqlFetch({
    cache: "force-cache",
    document: getRecentArticlesQuery,
    tags: ["ARTICLE"],
    variables,
  })

  return { articles: articles, count: articlesConnection.aggregate.count }
}

export async function getRecentArticlesWithMain(variables: { locale: Locale; skip?: number; first?: number }) {
  const { articles, articlesConnection, mainArticle } = await graphqlFetch({
    cache: "force-cache",
    document: getRecentArticlesWithMainQuery,
    tags: ["ARTICLE"],
    variables,
  })

  return { articles, count: articlesConnection.aggregate.count, mainArticle }
}

export async function getArticleRecommendedArticles(variables: { locale: Locale; id: string }) {
  const { article } = await graphqlFetch({
    cache: "force-cache",
    document: getArticleRecommendedArticlesQuery,
    variables,
  })
  return article ? article.recommendedArticles : []
}

export async function getArticleBySlug(variables: { locale: Locale; slug: string }) {
  const { articles } = await graphqlFetch({
    cache: "force-cache",
    document: getArticleBySlugQuery,
    variables,
  })
  return articles[0] ?? null
}

export async function getArticleMetadataBySlug(variables: { locale: Locale; slug: string }) {
  const { articles } = await graphqlFetch({
    cache: "force-cache",
    document: getArticleMetadataBySlugQuery,
    tags: ["ARTICLE"],
    variables,
  })
  return articles[0] ?? null
}

export async function getPageBySlug(variables: { locale: Locale; slug: string }) {
  const { pages } = await graphqlFetch({
    cache: "force-cache",
    document: getPageBySlugQuery,
    tags: ["PAGE"],
    variables,
  })
  return pages[0] ?? null
}

export async function getPageMetadataBySlug(variables: { locale: Locale; slug: string }) {
  const { pages } = await graphqlFetch({
    cache: "force-cache",
    document: getPageMetadataBySlugQuery,
    tags: ["PAGE"],
    variables,
  })
  return pages[0] ?? null
}

export async function listPagesForSitemap(locale: Locale) {
  const { pages } = await graphqlFetch({
    cache: "force-cache",
    document: listPagesForSitemapQuery,
    tags: ["PAGE"],
    variables: { locale },
  })
  return pages
}

export async function listArticlesBySlugs(variables: { locale: Locale; slugs: string[] }) {
  const { articles } = await graphqlFetch({
    cache: "force-cache",
    document: listArticlesBySlugQuery,
    tags: ["ARTICLE"],
    variables,
  })
  return articles
}

export async function listArticlesByCategory(variables: {
  locale: Locale
  categorySlug: string
  skip?: number
  first?: number
}) {
  const { articles, articlesConnection } = await graphqlFetch({
    cache: "force-cache",
    document: listArticlesByCategoryQuery,
    tags: ["ARTICLE", "CATEGORY"],
    variables,
  })
  return { articles, count: articlesConnection.aggregate.count }
}

export async function getQuizQuestionsById(variables: { locale: Locale; id: string; skip: number }) {
  const { quiz } = await graphqlFetch({
    cache: "force-cache",
    document: getQuizQuestionsByIdQuery,
    tags: ["QUIZ"],
    variables,
  })
  return quiz?.question ?? null
}

export async function getGlobalTranslations(variables: { locale: Locale }) {
  const { translationsSingleton } = await graphqlFetch({
    cache: "force-cache",
    document: getGlobalTranslationsQuery,
    tags: ["TRANSLATIONS"],
    variables,
  })
  return translationsSingleton?.translations
}
