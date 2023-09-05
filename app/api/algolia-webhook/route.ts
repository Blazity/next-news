import algolia from "algoliasearch"
import { env } from "env.mjs"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { verifyWebhookSignature } from "@hygraph/utils"

const client = algolia(env.ALGOLIA_API_ID, env.ALGOLIA_API_KEY)
const index = client.initIndex("articles")

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

    // const { id: objectID, ...data } = parseResult.data.data.PUBLISHED

    // await index.saveObject({ objectID, ...data })

    return NextResponse.json({ message: "ok" }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: "Unexpected Error" }, { status: 500 })
  }
}

const bodySchema = z.object({
  data: z.object({ localizations: z.array(z.any()) }),
})
