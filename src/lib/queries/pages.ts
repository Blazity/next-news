import { graphql } from "@/gql"

export const getPageBySlugQuery = graphql(`
  query getPageBySlug($locales: [Locale!]!, $slug: String!) {
    pages(locales: $locales, where: { slug: $slug }) {
      title
      content {
        raw
      }
    }
  }
`)

export const getPageMetadataBySlugQuery = graphql(`
  query getPageMetadataBySlugQuery($locales: [Locale!]!, $slug: String!) {
    pages(locales: $locales, where: { slug: $slug }) {
      seoComponent {
        title
        description {
          text
        }
      }
    }
  }
`)

export const listPagesForSitemapQuery = graphql(`
  query listPagesForSitemap($locales: [Locale!]!) {
    pages(locales: $locales) {
      slug
      locale
    }
  }
`)
