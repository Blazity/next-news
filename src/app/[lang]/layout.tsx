import { Footer } from "@/components/Footer/Footer"
import { Navigation } from "@/components/Navigation/Navigation"
import { env } from "@/env.mjs"
import { i18n, type Locale } from "@/i18n/i18n"
import "@/styles/tailwind.css"
import { getNavigation } from "@/lib/client"
import { GoogleAnalytics } from "../GoogleAnalytics"
import Providers from "../Providers"

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const locale = params.lang ?? i18n.defaultLocale
  return {
    title: "Blazity-Hygraph news starter",
    openGraph: {
      url: env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      types: {
        "application/rss+xml": `${env.NEXT_PUBLIC_SITE_URL}/api/${locale}`,
      },
    },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: { lang?: Locale } }) {
  const locale = params.lang ?? i18n.defaultLocale
  const { navigation, footer } = await getNavigation(locale)

  return (
    <html lang={locale}>
      <GoogleAnalytics />
      <Providers>
        <body className="flex min-h-screen flex-col items-center ">
          <div className="z-50 flex w-full justify-center border-b bg-white">
            <nav className="flex w-full max-w-[1200px] items-center justify-end gap-4 py-4">
              <Navigation navigation={navigation} locale={locale} />
            </nav>
          </div>

          <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-4 pb-16">{children}</main>
          <Footer footer={footer} lang={locale} />
        </body>
      </Providers>
    </html>
  )
}
