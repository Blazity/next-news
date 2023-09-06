import { NextRequest } from "next/server"
import { HttpError } from "./httpError"
import { verifyWebhookSignature } from "@hygraph/utils"
import { env } from "../../../env.mjs"

export const validateSignature = async (req: NextRequest) => {
  const authHeader = req.headers.get("gcms-signature")
  if (!authHeader) throw new HttpError("Unauthorized", 401)
  const parsedBody = await req.json()

  const isSignatureValid = verifyWebhookSignature({
    body: parsedBody,
    signature: authHeader,
    secret: env.HYGRAPH_WEBOOK_SECRET,
  })
  if (!isSignatureValid) throw new HttpError("Unauthorized", 401)

  const reqWithBody = Object.assign(req, { parsedBody })
  return reqWithBody
}

export type NextRequestWithBody = NextRequest & { parsedBody: unknown }

export const hasParsedBody = (req: NextRequestWithBody | NextRequest): req is NextRequestWithBody =>
  Boolean((req as NextRequestWithBody).body)
