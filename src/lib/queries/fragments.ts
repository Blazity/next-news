import { graphql } from "@/gql"

export const authorFragment = graphql(`
  fragment Author on Author {
    id
    name
    avatar {
      data {
        url
      }
    }
  }
`)

export const imageFragment = graphql(`
  fragment Image on Image {
    id
    description {
      text
    }
    data {
      url
    }
  }
`)

export const articleFragment = graphql(`
  fragment ArticleCard on Article {
    id
    author {
      ...Author
    }
    publishedAt
    updatedAt
    locale
    slug
    title
    tags {
      tag
    }
    image {
      ...Image
    }
  }
`)
