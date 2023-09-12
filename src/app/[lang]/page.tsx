import { Locale } from "i18n.js"
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

export default async function Web({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <>
      <RecentArticles lang={lang} />
    </>
  )
}
