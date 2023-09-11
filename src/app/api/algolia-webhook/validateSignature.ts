import { NextRequest } from "next/server"
import { HttpError } from "./httpError"
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

async function verifyWebhookSignature({
  body,
  signature,
  secret,
  rawPayload,
}: {
  body?: unknown
  signature: string
  secret: string
  rawPayload?: string
}) {
  const [rawSign, rawEnv, rawTimestamp] = signature.split(", ")

  const sign = rawSign.replace("sign=", "")
  const EnvironmentName = rawEnv.replace("env=", "")
  const Timestamp = parseInt(rawTimestamp.replace("t=", ""))

  const payload = JSON.stringify({
    Body: rawPayload || JSON.stringify(body),
    EnvironmentName,
    TimeStamp: Timestamp,
  })

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ])

  const signatureArrayBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload))

  const hash = btoa(String.fromCharCode(...Array.from(new Uint8Array(signatureArrayBuffer))))

  return sign === hash
}
