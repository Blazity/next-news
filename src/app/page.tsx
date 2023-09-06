import { DynamicSearchDialog } from "components/Search/DynamicSearchDialog"

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

export default function Web() {
  return (
    <>
      <section className="mx-auto flex max-w-4xl justify-end p-4">
        <DynamicSearchDialog index={`articles-en`} />
      </section>
    </>
  )
}
