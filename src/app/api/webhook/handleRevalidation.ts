import { revalidatePath, revalidateTag } from "next/cache"
import { z } from "zod"
import { hygraphLocaleToStandardNotation } from "@/i18n/i18n"
import { Tag } from "@/lib/tags"
import { NextRequestWithValidBody } from "./validateBody"

export function handleRevalidation<T extends RevalidationBody>(req: NextRequestWithValidBody<T>) {
  const tags = modelTypeToTags[req.validBody.data.__typename]
  const article = req.validBody.data
  if (isArticle(article)) {
    article.localizations.forEach(({ locale, slug }) => {
      revalidatePath(`/${hygraphLocaleToStandardNotation(locale)}/article/${slug}`)
    })
  }
  tags.forEach(revalidateTag)
  return req
}

const modelTypeToTags: Record<RevalidationBody["data"]["__typename"], Tag[]> = {
  Article: ["ARTICLE"],
  Navigation: ["NAVIGATION"],
  Footer: ["NAVIGATION"],
  Page: ["PAGE"],
  Homepage: ["HOMEPAGE"],
  Category: ["CATEGORY"],
  Author: ["ARTICLE"],
}

export const modelTypesSchema = z.object({
  __typename: z.enum(["Article", "Navigation", "Footer", "Page", "Homepage", "Category", "Author"]),
})

const isArticle = (data: RevalidationBody["data"]): data is z.infer<typeof articleSchema> =>
  data.__typename === "Article"

const articleSchema = z.object({
  __typename: z.enum(["Article"]),
  localizations: z.array(
    z.object({
      locale: z.string(),
      slug: z.string(),
    })
  ),
  id: z.string(),
})

const bodySchema = z.object({
  data: articleSchema.or(modelTypesSchema),
})

type RevalidationBody = z.infer<typeof bodySchema>
