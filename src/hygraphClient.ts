import type { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { GraphQLClient, Variables } from "graphql-request"
import type { HygraphLocaleEnum, Locale } from "i18n.js"
import { env } from "./env.mjs"
import { graphql } from "./gql"

const hygraphClient = (init?: RequestInit) =>
  new GraphQLClient(env.NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL, {
    fetch: (url, config) => fetch(url, { ...config, ...init }),
  })

const getArticles = graphql(`
  query getArticles($locales: [Locale!]!) {
    articles(locales: $locales) {
      id
      title
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

export const HygraphClient = (inputLocale: Locale) => {
  const locale = inputLocale.replace("-", "_") as HygraphLocaleEnum

  const makeRequest =
    <TQuery, TVariables>(document: TypedDocumentNode<TQuery, TVariables>) =>
    (variables: Omit<TVariables, "locales">, init?: RequestInit) => {
      const vars: Variables = { locales: [locale], ...variables }
      return hygraphClient(init).request(document, vars)
    }

  return {
    getArticles: makeRequest(getArticles),
    getArticleSummary: makeRequest(getArticleSummary),
    getRecentArticles: makeRequest(getRecentArticles),
    getHomepage: makeRequest(getHomepage),
  }
}
