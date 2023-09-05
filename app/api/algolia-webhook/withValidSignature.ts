import { verifyWebhookSignature } from "@hygraph/utils"
import { env } from "env.mjs"
import { NextRequest, NextResponse } from "next/server"

export const withValidSignature =
  <TContext>(fun: (req: NextRequestWithBody, context?: TContext) => Promise<NextResponse>) =>
  async (req: NextRequest, context?: TContext) => {
    const authHeader = req.headers.get("gcms-signature")
    if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const parsedBody = await req.json()

    const isSignatureValid = verifyWebhookSignature({
      body: parsedBody,
      signature: authHeader,
      secret: env.HYGRAPH_WEBOOK_SECRET,
    })
    if (!isSignatureValid) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const reqWithBody: NextRequestWithBody = Object.assign(req, { parsedBody })
    return fun(reqWithBody, context)
  }

export type NextRequestWithBody = NextRequest & { parsedBody: unknown }

export const hasParsedBody = (req: NextRequestWithBody | NextRequest): req is NextRequestWithBody =>
  Boolean((req as NextRequestWithBody).body)
