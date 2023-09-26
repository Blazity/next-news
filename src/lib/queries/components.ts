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

export const getHomepageMetadataQuery = graphql(`
  query getHomepageMetadataQuery($locales: [Locale!]!) {
    homepages(locales: $locales, first: 1) {
      seoComponent {
        title
        description {
          text
        }
      }
    }
  }
`)

export const getFooterQuery = graphql(`
  query getFooter($locales: [Locale!]!) {
    footers(locales: $locales, first: 1) {
      pages {
        slug
        title
      }
    }
  }
`)
