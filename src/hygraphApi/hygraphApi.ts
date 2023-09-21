import type { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { GraphQLClient, Variables } from "graphql-request"
import { env } from "@/env.mjs"
import { graphql } from "@/gql"
import { type HygraphLocaleEnum, i18n, type Locale } from "@/i18n/i18n"

const hygraphClient = (init?: RequestInit) =>
  new GraphQLClient(env.NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL, {
    fetch: (url, config) => fetch(url, { ...config, ...init }),
  })

const getPagesConfig = graphql(`
  query getPagesSlug($locales: [Locale!]!) {
    pages(locales: $locales) {
      slug
      locale
    }
  }
`)

const getPageContent = graphql(`
  query getPageContent($locales: [Locale!]!, $slug: String!) {
    pages(locales: $locales, where: { slug: $slug }) {
      title
      content {
        raw
      }
    }
  }
`)

const getHomepage = graphql(`
  query getHomepage($locales: [Locale!]!) {
    homepages(locales: $locales) {
      stockDailyQuotes {
        id
        name
        quote
      }
    }
  }
`)

const getArticles = graphql(`
  query getArticles($locales: [Locale!]!) {
    articles(locales: $locales) {
      id
      title
    }
  }
`)

const getRecentArticlesWithMetadata = graphql(`
  query getArticlesWithMeta($locales: [Locale!]!, $skip: Int = 0, $first: Int = 50) {
    articles(locales: $locales, skip: $skip, first: $first, orderBy: updatedAt_ASC) {
      author {
        name
      }
      createdAt
      locale
      slug
      title
      updatedAt
      coverImage {
        url
      }
    }
  }
`)

const getArticlesForSitemap = graphql(`
  query getArticlesForSitemap($locales: [Locale!]!, $skip: Int = 0, $first: Int = 50) {
    articles(locales: $locales, skip: $skip, first: $first, orderBy: updatedAt_ASC) {
      slug
      updatedAt
      coverImage {
        url
      }
    }
  }
`)

const getArticlesQuantity = graphql(`
  query getArticlesQuantity($locales: [Locale!]!) {
    articlesConnection(locales: $locales) {
      pageInfo {
        pageSize
      }
    }
  }
`)

const getArticleSummary = graphql(`
  query getArticleSummary($locales: [Locale!]!, $slug: String!) {
    articles(locales: $locales, where: { slug: $slug }) {
      id
      title
      coverImage(forceParentLocale: true) {
        id
        url
      }
      author {
        id
        name
      }
      content {
        raw
      }
    }
  }
`)

const getRecentArticles = graphql(`
  query getRecentArticles($locales: [Locale!]!, $perPage: Int = 10, $skip: Int = 0) {
    articles(locales: $locales, orderBy: publishedAt_DESC, first: $perPage, skip: $skip) {
      id
      title
      slug
      publishedAt
      coverImage(forceParentLocale: true) {
        id
        url
      }
      author {
        id
        name
      }
    }
    articlesConnection(locales: $locales) {
      aggregate {
        count
      }
    }
  }
`)

const getStockDailyQuotes = graphql(`
  query getStockDailyQuotes($symbols: [String!]!) {
    stockDailyQuotes(where: { symbol_in: $symbols }) {
      id
      name
      quote
    }
  }
`)

const getArticlesBySlug = graphql(`
  query getArticlesBySlug($locales: [Locale!]!, $slugs: [String!]!) {
    articles(locales: $locales, where: { slug_in: $slugs }) {
      id
      title
      slug
      publishedAt
      coverImage(forceParentLocale: true) {
        id
        url
      }
      author {
        id
        name
      }
    }
  }
`)

export function HygraphApi({ lang = i18n.defaultLocale }: { lang?: Locale }) {
  const locale = lang.replace("-", "_") as HygraphLocaleEnum

  const makeRequest =
    <TQuery, TVariables>(document: TypedDocumentNode<TQuery, TVariables>) =>
    (variables: Omit<TVariables, "locales">, init?: RequestInit) => {
      const vars: Variables = { locales: [locale], ...variables }
      return hygraphClient(init).request(document, vars)
    }

  return {
    getArticlesForSitemap: makeRequest(getArticlesForSitemap),
    getArticlesQuantity: makeRequest(getArticlesQuantity),
    getRecentArticlesWithMetadata: makeRequest(getRecentArticlesWithMetadata),
    getPagesConfig: makeRequest(getPagesConfig),
    getPageContent: makeRequest(getPageContent),
    getArticles: makeRequest(getArticles),
    getArticleSummary: makeRequest(getArticleSummary),
    getRecentArticles: makeRequest(getRecentArticles),
    getHomepage: makeRequest(getHomepage),
    getStockDailyQuotes: makeRequest(getStockDailyQuotes),
    getArticlesBySlug: makeRequest(getArticlesBySlug),
  }
}
