import { revalidateTag } from "next/cache"
import { z } from "zod"
import { Tag } from "@/lib/tags"
import { NextRequestWithValidBody } from "./validateBody"

export function handleRevalidation<T extends RevalidationBody>(req: NextRequestWithValidBody<T>) {
  const tags = modelTypeToTags[req.validBody.data.__typename]
  tags.forEach(revalidateTag)
  return req
}

const modelTypeToTags: Record<RevalidationBody["data"]["__typename"], Tag[]> = {
  Article: ["ARTICLE"],
  Navigation: ["NAVIGATION"],
  Footer: ["FOOTER"],
  Page: ["PAGE"],
  Homepage: ["HOMEPAGE"],
  Category: ["CATEGORY"],
  Author: ["ARTICLE"],
  Quiz: ["ARTICLE"],
}

export const modelTypesSchema = z.object({
  __typename: z.enum(["Article", "Navigation", "Footer", "Page", "Homepage", "Category", "Author", "Quiz"]),
})

const bodySchema = z.object({
  data: modelTypesSchema,
})

type RevalidationBody = z.infer<typeof bodySchema>
