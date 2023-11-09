import { graphql } from "@/gql"

export const getGlobalTranslationsQuery = graphql(`
  query getGlobalTranslations($locales: [Locale!]!) {
    translationsSingleton: singleton(where: { key: "translations" }, locales: $locales) {
      translations: model {
        ... on GlobalTranslations {
          showMore
          showing
          resultsFor
          searchCategory
          search
          selectTag
          shareOnSocial
          relatedArticles
          noTagsFound
          noResultsFor
          loading
        }
      }
    }
  }
`)
