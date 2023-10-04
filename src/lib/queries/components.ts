import { graphql } from "@/gql"

export const getNavigationQuery = graphql(`
  query getNavigation($locales: [Locale!]!) {
    navigations(locales: $locales, first: 1) {
      elements {
        element {
          ... on Category {
            __typename
            title
            slug
          }
          ... on Page {
            __typename
            title
            slug
          }
        }
      }
      logo {
        url
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
      recentSectionTitle
      trendingSectionTitle
      highlightedCategoryTitle
      highlightedCategory(forceParentLocale: true) {
        slug
        title
        id
      }
      highlightedSectionTitle
      highlightedArticles(forceParentLocale: true) {
        id
        author {
          name
        }
        publishedAt
        locale
        slug
        title
        tags
        image {
          description {
            text
          }
          data {
            url
          }
        }
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
