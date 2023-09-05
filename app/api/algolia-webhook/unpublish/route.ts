import algolia from "algoliasearch"
import { env } from "env.mjs"
import { NextResponse } from "next/server"
import { slateToText } from "utils/slateToText"
import { z } from "zod"
import { withValidSignature } from "../withValidSignature"
import { NextRequestWithValidBody, withBodySchema } from "../withBodySchema"

const client = algolia(env.ALGOLIA_API_ID, env.ALGOLIA_API_KEY)

async function handleAlgoliaWebhook(req: NextRequestWithValidBody<z.infer<typeof bodySchema>>) {
  try {
    const article = req.validBody.data

    const indexingResults = await Promise.allSettled(
      article.localizations.map(async ({ locale, title, content }) => {
        const index = client.initIndex(`articles-${locale}`)
        await index.saveObject({
          objectID: article.id,
          title,
          content: slateToText(content),
        })

        return { title, locale }
      })
    )

    return NextResponse.json({ result: indexingResults }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: "Unexpected Error" }, { status: 500 })
  }
}

const bodySchema = z.object({
  data: z.object({
    localizations: z.array(z.object({ content: z.any(), title: z.string(), locale: z.string() })),
    id: z.string(),
  }),
})

export const POST = withValidSignature(withBodySchema(handleAlgoliaWebhook, bodySchema))
