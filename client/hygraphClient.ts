import { GraphQLClient } from "graphql-request"
import { graphql } from "../gql"
import { TypedDocumentNode } from "@graphql-typed-document-node/core"
import { env } from "env.mjs"

const hygraphClient = (init?: RequestInit) =>
  new GraphQLClient(env.HYGRAPH_CONTENT_API_URL, {
    fetch: (url, config) => fetch(url, { ...config, ...init }),
  })

const getArticles = graphql(`
  query getArticles($locales: [Locale!] = [en]) {
    articles(locales: $locales) {
      id
      title
      content {
        html
      }
    }
  }
`)

export const useHygraphClient = () => {
  const makeRequest =
    <TQuery, TVariables>(document: TypedDocumentNode<TQuery, TVariables>) =>
    (init?: RequestInit) =>
      hygraphClient(init).request(document, {})

  return {
    getArticles: makeRequest(getArticles),
  }
}
