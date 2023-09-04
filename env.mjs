import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    HYGRAPH_CONTENT_API_URL: z.string(),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    HYGRAPH_CONTENT_API_URL: process.env.HYGRAPH_CONTENT_API_URL,
  },
})
