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

export const listPagesForSitemapQuery = graphql(`
  query listPagesForSitemap($locales: [Locale!]!) {
    pages(locales: $locales) {
      slug
      locale
    }
  }
`)
