import algolia from "algoliasearch"
import { env } from "env.mjs"
import { NextRequest, NextResponse } from "next/server"
import { pipe } from "utils/pipe"
import { slateToText } from "utils/slateToText"
import { z } from "zod"
import { errorToNextResponse } from "../httpError"
import { NextRequestWithValidBody, validateBody } from "../validateBody"
import { validateSignature } from "../validateSignature"

const client = algolia(env.ALGOLIA_API_ID, env.ALGOLIA_API_KEY)

async function handleAlgoliaWebhook(req: NextRequestWithValidBody<z.infer<typeof bodySchema>>) {
  const article = req.validBody.data

  const indexingResults = await Promise.allSettled(
    article.localizations.map(async ({ locale }) => {
      const index = client.initIndex(`articles-${locale}`)
      await index.deleteObject(article.id)

      return { locale }
    })
  )

  return NextResponse.json({ result: indexingResults }, { status: 201 })
}

export async function POST(req: NextRequest) {
  try {
    return await pipe(req, validateSignature, validateBody(bodySchema), handleAlgoliaWebhook)
  } catch (error) {
    return errorToNextResponse(error)
  }
}

const bodySchema = z.object({
  data: z.object({
    localizations: z.array(z.object({ locale: z.string() })),
    id: z.string(),
  }),
})
