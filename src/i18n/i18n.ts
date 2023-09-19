import { Locale as HygraphLocaleEnum } from "../gql/graphql"

export { HygraphLocaleEnum }

export type HygraphLocale = `${HygraphLocaleEnum}`

export type Locale = Replace<HygraphLocale, "_", "-">

type Replace<
  T extends string,
  S extends string,
  D extends string,
  A extends string = ""
> = T extends `${infer L}${S}${infer R}` ? Replace<R, S, D, `${A}${L}${D}`> : `${A}${T}`

const locales = Object.values(HygraphLocaleEnum).map(
  (hygraphLocale) => hygraphLocaleToStandardNotation(hygraphLocale) as Locale
)

const defaultLocale: Locale = "en"

export function hygraphLocaleToStandardNotation(locale: string) {
  return locale.replace("_", "-")
}

export const i18n = {
  locales,
  defaultLocale,
}
