import { RecentArticles } from "@/components/RecentArticles/RecentArticles"
import { StockDisplay } from "@/components/StockDisplay/StockDisplay"
import { env } from "@/env.mjs"
import { Locale } from "@/i18n/i18n"

export async function generateMetadata({ params }: { params: { lang: Locale } }){
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
      'application/rss+xml': `${env.VERCEL_URL}/api/${params?.lang}`,
    },
  }
}
}

export default async function Web({ params }: { params: { lang: Locale } }) {

  return (
    <>
      <div className="flex w-full justify-end px-4 pt-4">
        <StockDisplay />
      </div>
      <RecentArticles lang={params.lang} />
    </>
  )
}
