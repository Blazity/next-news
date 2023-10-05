import { graphql } from "@/gql"

export const getQuizQuestionsByIdQuery = graphql(`
  query getQuizQuestionsById($locales: [Locale!]!, $id: ID!, $skip: Int = 0) {
    quiz(locales: $locales, where: { id: $id }) {
      title
      question(skip: $skip) {
        id
        content {
          raw
        }
        answer {
          id
          content {
            raw
          }
          isValid
        }
      }
    }
  }
`)
