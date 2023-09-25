import { Metadata } from "next"
import { notFound } from "next/navigation"
import { RichText } from "@/components/RichText/RichText"
import { HygraphApi } from "@/hygraphApi/hygraphApi"
import { Locale } from "@/i18n/i18n"
import { getMatadataObj } from "@/utils/getMetadataObj"

type CustomPageProps = {
  params: { slug: string; lang: Locale }
}

export async function generateMetadata({ params: { slug, lang } }: CustomPageProps): Promise<Metadata | null> {
  const { getPageMetadata } = HygraphApi({ lang })
  const { pages } = await getPageMetadata({ slug })
  const { seoComponent } = pages[0]

  if (!seoComponent) return null
  return getMatadataObj({ title: seoComponent?.title, description: seoComponent?.description?.text })
}

export default async function Web({ params: { slug, lang } }: CustomPageProps) {
  const { getPageContent } = HygraphApi({ lang })
  const { pages } = await getPageContent({ slug })
  const page = pages[0]

  if (!page) notFound()
  return (
    <section className="w-full px-4 pb-16 pt-8">
      <h1 className="mb-8 text-2xl font-semibold">{page.title}</h1>
      <RichText raw={page.content?.raw} />
    </section>
  )
}
