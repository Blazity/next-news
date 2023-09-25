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

type CoverImageInfo = {
  url?: string
  title?: string
}

type MetadataOptions = {
  title?: string | null
  type?: OpenGraphType
  description?: string
  author?: AuthorInfo
  coverImage?: CoverImageInfo | null
}

export function getMatadataObj(options: MetadataOptions): Metadata {
  const { author, type, title, coverImage, description } = options

  const defaultTitle = "Next.js Enterprise"
  const defaultDescription = "Next.js Enterprise description"
  const defaultType = "article"

  const ogImage = coverImage
    ? [
        {
          url: `/api/og?${new URLSearchParams({
            title: coverImage.title ?? "Next.js image title",
            image: coverImage.url ?? "nextjs/image",
          })}`,
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
      url: env.VERCEL_URL,
      title: title ?? defaultTitle,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
    },
  }
}
