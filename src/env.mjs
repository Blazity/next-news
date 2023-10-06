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
    GA_BASE64_SERVICE_ACCOUNT: z.string(),
  },
  client: {
    NEXT_PUBLIC_ALGOLIA_API_ID: z.string(),
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: z.string(),
    NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string(),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    HYGRAPH_WEBOOK_SECRET: process.env.HYGRAPH_WEBOOK_SECRET,
    ALGOLIA_API_ID: process.env.ALGOLIA_API_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
    GA_PROPERTY_ID: process.env.GA_PROPERTY_ID,
    GA_BASE64_SERVICE_ACCOUNT: process.env.GA_BASE64_SERVICE_ACCOUNT,
    NEXT_PUBLIC_ALGOLIA_API_ID: process.env.NEXT_PUBLIC_ALGOLIA_API_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL: process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API_URL,
    NEXT_PUBLIC_SITE_URL:
      `https://${process.env.NEXT_PUBLIC_SITE_URL}` ??
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ??
      "http://localhost:3000",
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION?.toString() === "true",
})
