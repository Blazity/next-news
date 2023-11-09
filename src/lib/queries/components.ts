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
    asset(where: { id: "clo74v3lz1yqp0bw1w7jsrrin" }) {
      url
    }
    footers(locales: $locales, first: 1) {
      logo {
        url
      }
      ownershipAndCredits
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

export const getNavigationTranslationQuery = graphql(`
  query getNavigationTranslation($locales: [Locale!]!) {
    singleton(where: { key: "translations" }, locales: $locales) {
      model {
        ... on GlobalTranslations {
          selectTag
          search
          noTagsFound
          noResultsFor
        }
      }
    }
  }
`)

export const getHomepageQuery = graphql(`
  query getHomepage($locales: [Locale!]!) {
    marketStock
    homepages(locales: $locales, first: 1) {
      heroArticle {
        id
        author {
          name
          avatar {
            data {
              url
            }
          }
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
          avatar {
            data {
              url
            }
          }
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

export const getHomepageTranslationQuery = graphql(`
  query getHomepageTranslation($locales: [Locale!]!) {
    singleton(where: { key: "translations" }, locales: $locales) {
      model {
        ... on GlobalTranslations {
          showMore
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
