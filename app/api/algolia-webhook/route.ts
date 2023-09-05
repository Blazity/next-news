import { verifyWebhookSignature } from "@hygraph/utils"
import algolia from "algoliasearch"
import { env } from "env.mjs"
import { NextRequest, NextResponse } from "next/server"
import { slateToText } from "utils/slateToText"
import { z } from "zod"

const client = algolia(env.ALGOLIA_API_ID, env.ALGOLIA_API_KEY)

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("gcms-signature")
  if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  try {
    const publishedData = await req.json()

    const isSignatureValid = verifyWebhookSignature({
      body: publishedData,
      signature: authHeader,
      secret: env.HYGRAPH_WEBOOK_SECRET,
    })
    if (!isSignatureValid) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const parseResult = bodySchema.safeParse(publishedData)
    if (!parseResult.success) return NextResponse.json({ message: "Bad Request" }, { status: 400 })

    const article = parseResult.data.data

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
