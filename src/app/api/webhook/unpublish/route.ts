import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { hygraphLocaleToStandardNotation } from "@/i18n/i18n"
import { pipe } from "@/utils/pipe"
import { errorToNextResponse } from "../../httpError"
import { algoliaClient } from "../algoliaClient"
import { handleRevalidation, modelTypesSchema } from "../handleRevalidation"
import { NextRequestWithValidBody, validateBody } from "../validateBody"
import { validateSignature } from "../validateSignature"

async function handleAlgoliaUnpublishWebhook(req: NextRequestWithValidBody<UnpublishWebhookBody>) {
  const article = req.validBody.data
  if (!isArticle(article)) return NextResponse.json({ result: "success" }, { status: 200 })

  const indexingResults = await Promise.allSettled(
    article.localizations.map(async ({ locale: hygraphLocale }) => {
      const locale = hygraphLocaleToStandardNotation(hygraphLocale)
      const index = algoliaClient.initIndex(`articles-${locale}`)
      await index.deleteObject(article.id)

      return { locale }
    })
  )

  return NextResponse.json({ result: indexingResults }, { status: 201 })
}

const isArticle = (data: UnpublishWebhookBody["data"]): data is z.infer<typeof articleSchema> =>
  data.__typename === "Article"

export async function POST(req: NextRequest) {
  try {
    return await pipe(
      req,
      validateSignature,
      validateBody(bodySchema),
      handleRevalidation,
      handleAlgoliaUnpublishWebhook
    )
  } catch (error) {
    return errorToNextResponse(error)
  }
}

const articleSchema = z.object({
  __typename: z.enum(["Article"]),
  localizations: z.array(z.object({ locale: z.string() })),
  id: z.string(),
})

const bodySchema = z.object({
  data: articleSchema.or(modelTypesSchema),
})

type UnpublishWebhookBody = z.infer<typeof bodySchema>
