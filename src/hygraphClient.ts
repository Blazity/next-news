import type { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { GraphQLClient, Variables } from "graphql-request"
import type { HygraphLocaleEnum, Locale } from "i18n.js"
import { env } from "./env.mjs"
import { graphql } from "./gql"

const hygraphClient = (init?: RequestInit) =>
  new GraphQLClient(env.HYGRAPH_CONTENT_API_URL, {
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
  }
}
