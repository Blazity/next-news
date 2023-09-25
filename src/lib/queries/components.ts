import { graphql } from "@/gql"

export const getNavigationQuery = graphql(`
  query getNavigation($locales: [Locale!]!) {
    navigations(locales: $locales, first: 1) {
      pages {
        slug
        title
      }
    }
  }
`)

export const getHomepageQuery = graphql(`
  query getHomepage($locales: [Locale!]!) {
    homepages(locales: $locales, first: 1) {
      stockDailyQuotes {
        id
        name
        quote
      }
    }
  }
`)
