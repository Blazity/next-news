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
    footers(locales: $locales, first: 1) {
      logo {
        url
      }
      companyName
      youtubeLink
      twitterLink
      instagramLink
      facebookLink
      contactSection {
        country
        city
        postCode
        street
      }
      links {
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
    }
  }
`)

export const getHomepageQuery = graphql(`
  query getHomepage($locales: [Locale!]!) {
    marketStock
    homepages(locales: $locales, first: 1) {
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
