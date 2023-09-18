import { Metadata } from "next"
import { notFound } from "next/navigation"
import { RichText } from "@/components/RichText/RichText"
import { HygraphClient } from "@/hygraphClient"
import { Locale } from "@/i18n"
import { useLocale } from "@/store"

type CustomPageProps = {
  params: { slug: string; lang: Locale }
}

export async function generateMetadata({ params: { slug } }: CustomPageProps): Promise<Metadata | null> {
  const { getPageContent } = HygraphClient()
  const { pages } = await getPageContent({ slug })
  const page = pages[0]

  if (!page) return null
  return {
    title: page.title,
    keywords: [page.title],
  }
}

export async function generateStaticParams() {
  const { getPagesConfig } = HygraphClient()
  const { pages } = await getPagesConfig({})

  return pages
}

export default async function Web({ params: { slug, lang } }: CustomPageProps) {
  useLocale.setState({ locale: lang })
  const { getPageContent } = HygraphClient()
  const { pages } = await getPageContent({ slug })
  const page = pages[0]

  if (!page) notFound()
  return (
    <section className="w-full px-4 pb-16">
      <h1>{page.title}</h1>
      <RichText raw={page.content?.raw} />
    </section>
  )
}
