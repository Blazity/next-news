import { Metadata } from "next"
import { notFound } from "next/navigation"
import { RichText } from "@/components/RichText/RichText"
import { hygraphLocaleToStandardNotation, i18n, Locale } from "@/i18n/i18n"
import { getPageBySlug, getPageMetadataBySlug, listPagesForSitemap } from "@/lib/client"
import { getMatadataObj } from "@/utils/getMetadataObj"

type CustomPageProps = {
  params: { slug: string; lang: Locale }
}

export async function generateStaticParams() {
  const pages = await Promise.all(i18n.locales.map((locale) => listPagesForSitemap(locale)))
  const flatPages = pages.flatMap((pages) => pages)
  return flatPages.map(({ slug, locale }) => ({
    lang: hygraphLocaleToStandardNotation(locale),
    slug,
  }))
}

export async function generateMetadata({ params: { slug, lang } }: CustomPageProps): Promise<Metadata | null> {
  const { seoComponent } = await getPageMetadataBySlug({ locale: lang, slug })

  return getMatadataObj({ title: seoComponent?.title, description: seoComponent?.description?.text })
}

export default async function Web({ params: { slug, lang } }: CustomPageProps) {
  const page = await getPageBySlug({ locale: lang, slug })

  if (!page) notFound()
  return (
    <section className="w-full px-4 pb-16 pt-8">
      <h1 className="mb-8 text-2xl font-semibold">{page.title}</h1>
      <RichText raw={page.content?.raw} />
    </section>
  )
}
