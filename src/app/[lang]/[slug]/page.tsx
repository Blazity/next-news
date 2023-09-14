import { Metadata } from "next"
import { redirect } from "next/navigation"
import { RichText } from "components/RichText/RichText"
import { HygraphClient } from "hygraphClient"
import { Locale } from "i18n"

interface CustomPageProps {
  params: { slug: string; lang: Locale }
}

export async function generateMetadata({ params: { lang, slug } }: CustomPageProps): Promise<Metadata | null> {
  const { getPageContent } = HygraphClient(lang)
  const { pages } = await getPageContent({ slug })
  const page = pages[0]

  if (!page) return null
  return {
    title: page.title,
    keywords: [page.title],
  }
}

export default async function Web({ params: { slug, lang } }: CustomPageProps) {
  const { getPageContent } = HygraphClient(lang)
  const { pages } = await getPageContent({ slug })
  const page = pages[0]

  if (!page) return redirect("/not-found")
  return (
    <section className="w-full px-4 pb-16">
      <h1>{page.title}</h1>
      <RichText raw={page.content?.raw} />
    </section>
  )
}
