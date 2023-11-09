import pickBy from "lodash/pickBy"
import { cache } from "react"
import { GetGlobalTranslationsQuery } from "@/gql/graphql"
import { getGlobalTranslations } from "@/lib/client"
import { Locale } from "./i18n"

type NonNullableProperty<T> = { [P in keyof T]: NonNullable<T[P]> }
type RequiredNonNullable<T> = Required<NonNullableProperty<T>>
export type GlobalTranslations = RequiredNonNullable<
  Omit<NonNullable<NonNullable<GetGlobalTranslationsQuery["translationsSingleton"]>["translations"]>, "__typename">
>

export const defaultTranslations = {
  showMore: "Show More (fallback)",
  showing: "Showing",
  resultsFor: "results for",
  searchCategory: "Search Category",
  search: "Search (fallback)",
  selectTag: "Select tag (fallback)",
  shareOnSocial: "Share on social",
  relatedArticles: "Related articles",
  noTagsFound: "No tags found.",
  noResultsFor: "No results for",
  loading: "Loading",
}

const getCache = cache(() => {
  const value: { translations: GlobalTranslations } = {
    translations: defaultTranslations,
  }
  return value
})

export async function setTranslations(locale: Locale) {
  const translations = await getGlobalTranslations({ locale })

  const merged = translations
    ? { ...defaultTranslations, ...pickBy(translations, (val) => Boolean(val)) }
    : defaultTranslations
  getCache().translations = merged
  return merged
}

export function getTranslations() {
  return getCache().translations
}
