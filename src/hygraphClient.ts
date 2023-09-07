import type { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { GraphQLClient } from "graphql-request"
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

export const useHygraphClient = (inputLocale: Locale) => {
  const locale = inputLocale.replace("-", "_") as HygraphLocaleEnum

  const makeRequest =
    <TQuery, TVariables>(document: TypedDocumentNode<TQuery, TVariables>) =>
    (init?: RequestInit) =>
      hygraphClient(init).request(document, { locales: [locale] })

  return {
    getArticles: makeRequest(getArticles),
  }
}
