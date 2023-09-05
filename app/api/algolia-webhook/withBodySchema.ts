import { NextRequest, NextResponse } from "next/server"
import { hasParsedBody, NextRequestWithBody } from "./withValidSignature"

export const withBodySchema =
  <TBody, TContext>(
    fun: (req: NextRequestWithValidBody<TBody>, context?: TContext) => Promise<NextResponse>,
    schema: Zod.Schema<TBody>
  ) =>
  async (req: NextRequest | NextRequestWithBody, context?: TContext) => {
    try {
      const hasBody = hasParsedBody(req)
      const parseResult = schema.safeParse(hasBody ? req.body : await req.json())
      if (!parseResult.success) return NextResponse.json({ message: "Bad Request" }, { status: 400 })

      const reqWithBody: NextRequestWithValidBody<TBody> = Object.assign(req, { validBody: parseResult.data })
      return fun(reqWithBody, context)
    } catch {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 })
    }
  }

export type NextRequestWithValidBody<T> = NextRequest & { validBody: T }
