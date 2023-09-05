import { NextResponse, NextRequest } from "next/server"
import { NextRequestWithBody, hasParsedBody } from "./withValidSignature"

export const withBodySchema =
  <T>(fun: (req: NextRequestWithValidBody<T>, context?: any) => Promise<NextResponse>, schema: Zod.Schema<T>) =>
  async (req: NextRequest | NextRequestWithBody, context?: any) => {
    try {
      const hasBody = hasParsedBody(req)
      const parseResult = schema.safeParse(hasBody ? req.body : await req.json())
      if (!parseResult.success) return NextResponse.json({ message: "Bad Request" }, { status: 400 })

      const reqWithBody: NextRequestWithValidBody<T> = Object.assign(req, { validBody: parseResult.data })
      return fun(reqWithBody, context)
    } catch {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 })
    }
  }

export type NextRequestWithValidBody<T> = NextRequest & { validBody: T }
