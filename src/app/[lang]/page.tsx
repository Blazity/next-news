import { StockDisplay } from "components/StockDisplay/StockDisplay"
import { Locale } from "i18n/i18n"
import { RecentArticles } from "../../components/RecentArticles/RecentArticles"

export const metadata = {
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
