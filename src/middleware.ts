import { match } from "@formatjs/intl-localematcher"
import fromPairs from "lodash/fromPairs"
import Negotiator from "negotiator"
import { NextRequest, NextResponse } from "next/server"
import { i18n } from "./i18n/i18n"

function getLocale(request: NextRequest) {
  // Negotiator expects headers as a record object, not a Set thus some mapping is required
  const headers = mapHeadersToObject(request.headers)
  const languages = new Negotiator({
    headers,
  }).languages()

  const languagesToMatch = languages.length === 1 && languages[0] === "*" ? [i18n.defaultLocale] : languages

  return match(languagesToMatch, i18n.locales, i18n.defaultLocale)
}

const mapHeadersToObject = (headers: Headers) => fromPairs(Array.from(headers.entries()))

export function middleware(request: NextRequest) {
  console.log("hello middleware")
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (!pathnameIsMissingLocale) return
  const locale = getLocale(request)

  return NextResponse.redirect(new URL(`/${locale}`, request.url))
}

export const config = {
  matcher: ["/"],
}
