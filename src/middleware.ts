import { match } from "@formatjs/intl-localematcher"
import fromPairs from "lodash/fromPairs"
import Negotiator from "negotiator"
import { NextRequest, NextResponse } from "next/server"
import { i18n } from "./i18n"

function getLocale(request: NextRequest) {
  // Negotiator expects headers as a record object, not a Set thus some mapping is required
  const headers = mapHeadersToObject(request.headers)
  const languages = new Negotiator({
    headers,
  }).languages()

  return match(languages, i18n.locales, i18n.defaultLocale)
}

const mapHeadersToObject = (headers: Headers) => fromPairs(Array.from(headers.entries()))

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (!pathnameIsMissingLocale) return
  const locale = getLocale(request)

  return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|public).*)"],
}
