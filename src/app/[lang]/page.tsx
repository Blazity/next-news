import { DynamicLangSelect } from "components/LangSelect/DynamicLangSelect"
import { DynamicSearchDialog } from "components/Search/DynamicSearchDialog"
import { useHygraphClient } from "hygraphClient"
import { Locale } from "i18n.js"
import { useMemo } from "react"

export const metadata = {
  title: "Next.js Enterprise Boilerplate",
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
  // const client = useHygraphClient(lang)

  return (
    <>
      <section className="flex w-full justify-end gap-4 p-4">
        <DynamicSearchDialog lang={lang} />
        <DynamicLangSelect lang={lang} />
      </section>
      <section></section>
    </>
  )
}
