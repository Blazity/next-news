import { DynamicLangSelect } from "@/components/LangSelect/DynamicLangSelect"
import { Navigation } from "@/components/Navigation/Navigation"
import { DynamicSearchDialog } from "@/components/Search/DynamicSearchDialog"
import { env } from "@/env.mjs"
import type { Locale } from "@/i18n/i18n"
import { GoogleAnalytics } from "./GoogleAnalytics"
import Providers from "./Providers"
import "@/styles/tailwind.css"

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  return {
    title: "Blazity-Hygraph news starter",
    openGraph: {
      url: "https://next-enterprise.vercel.app/",
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
        "application/rss+xml": `${env.VERCEL_URL}/api/${params?.lang}`,
      },
    },
  }
}

export default function Layout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  return (
    <html lang={params.lang}>
      <GoogleAnalytics />
      <Providers>
        <body>
          <main className="mx-auto flex max-w-[1200px] flex-col items-center justify-start py-8">
            <nav className="flex w-full justify-end gap-4 px-4">
              <Navigation lang={params.lang} />
              <DynamicSearchDialog />
              <DynamicLangSelect />
            </nav>
            {children}
          </main>
        </body>
      </Providers>
    </html>
  )
}
