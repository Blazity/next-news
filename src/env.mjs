import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    HYGRAPH_CONTENT_API_URL: z.string(),
    HYGRAPH_WEBOOK_SECRET: z.string(),
    ALGOLIA_API_ID: z.string(),
    ALGOLIA_API_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    HYGRAPH_CONTENT_API_URL: process.env.HYGRAPH_CONTENT_API_URL,
    HYGRAPH_WEBOOK_SECRET: process.env.HYGRAPH_WEBOOK_SECRET,
    ALGOLIA_API_ID: process.env.ALGOLIA_API_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  },
})
