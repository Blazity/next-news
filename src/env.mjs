import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    HYGRAPH_WEBOOK_SECRET: z.string(),
    ALGOLIA_API_ID: z.string(),
    ALGOLIA_API_KEY: z.string(),
    GA_MEASUREMENT_ID: z.string(),
    GA_PROPERTY_ID: z.string(),
    VERCEL_URL: z.string(),
    GOOGLE_APPLICATION_CREDENTIALS: z.string(),
  },
  client: {
    NEXT_PUBLIC_ALGOLIA_API_ID: z.string(),
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: z.string(),
    NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL: z.string(),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    HYGRAPH_WEBOOK_SECRET: process.env.HYGRAPH_WEBOOK_SECRET,
    ALGOLIA_API_ID: process.env.ALGOLIA_API_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
    GA_PROPERTY_ID: process.env.GA_PROPERTY_ID,
    VERCEL_URL: process.env.VERCEL_URL ?? "localhost:3000",
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    NEXT_PUBLIC_ALGOLIA_API_ID: process.env.NEXT_PUBLIC_ALGOLIA_API_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL: process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL,
  },
})
