import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { hygraphLocaleToStandardNotation } from "@/i18n/i18n"
import { pipe } from "@/utils/pipe"
import { slateToText } from "@/utils/slateToText"
import { errorToNextResponse } from "../../httpError"
import { algoliaClient } from "../algoliaClient"
import { handleRevalidation, modelTypesSchema } from "../handleRevalidation"
import { NextRequestWithValidBody, validateBody } from "../validateBody"
import { validateSignature } from "../validateSignature"

async function handleAlgoliaPublishWebhook(req: NextRequestWithValidBody<PublishWebhookBody>) {
  const article = req.validBody.data
  if (!isArticle(article)) return NextResponse.json({ result: "success" }, { status: 200 })

  const indexingResults = await Promise.allSettled(
    article.localizations.map(async ({ locale: hygraphLocale, title, content, slug, tags }) => {
      const locale = hygraphLocaleToStandardNotation(hygraphLocale)
      const index = algoliaClient.initIndex(`articles-${locale}`)
      index.setSettings({
        searchableAttributes: ["title", "content", "tags"],
        attributesForFaceting: ["searchable(tags)"],
      })
      await index.saveObject({
        objectID: article.id,
        title,
        content: slateToText(content),
        slug,
        tags: tags.map(({ tag }) => tag),
      })

      return { title, locale }
    })
  )

  return NextResponse.json({ result: indexingResults }, { status: 201 })
}

export async function POST(req: NextRequest) {
  try {
    return await pipe(req, validateSignature, validateBody(bodySchema), handleRevalidation, handleAlgoliaPublishWebhook)
  } catch (error) {
    return errorToNextResponse(error)
  }
}

const isArticle = (data: PublishWebhookBody["data"]): data is z.infer<typeof articleSchema> =>
  data.__typename === "Article"

const articleSchema = z.object({
  __typename: z.enum(["Article"]),
  localizations: z.array(
    z.object({
      content: z.any(),
      title: z.string(),
      locale: z.string(),
      slug: z.string(),
      tags: z.array(z.object({ tag: z.string() })),
    })
  ),
  id: z.string(),
})

const bodySchema = z.object({
  data: articleSchema.or(modelTypesSchema),
})

type PublishWebhookBody = z.infer<typeof bodySchema>
