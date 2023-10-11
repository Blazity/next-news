import { Metadata } from "next"
import { env } from "@/env.mjs"

type OpenGraphType =
  | "article"
  | "website"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other"

type AuthorInfo = {
  name?: string
}

type ImageData = {
  url?: string
}

type ImageDescription = {
  text: string
}

type ImageInfo = {
  title: string
  description?: ImageDescription | null
  data: ImageData
}

type MetadataOptions = {
  title?: string | null
  type?: OpenGraphType
  description?: string
  author?: AuthorInfo
  image?: ImageInfo | null
}

export function getMatadataObj(options: MetadataOptions): Metadata {
  const { author, type, title, image, description } = options

  const defaultTitle = "Next.js Enterprise"
  const defaultDescription = "Next.js Enterprise description"
  const defaultType = "article"

  const ogImage = image?.data?.url
    ? [
        {
          url: `${env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(title ?? "")}&image=${encodeURIComponent(
            image.data?.url
          )}`,
          width: 1200,
          height: 630,
        },
      ]
    : []

  return {
    title: title ?? defaultTitle,
    description: description ?? defaultDescription,
    openGraph: {
      type: type ?? defaultType,
      authors: author?.name ? [author.name] : [],
      url: env.NEXT_PUBLIC_SITE_URL,
      title: title ?? defaultTitle,
      description: description ?? defaultDescription,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
    },
  }
}
