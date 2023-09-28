import { NextRequest } from "next/server"

import { hasParsedBody, NextRequestWithBody } from "./validateSignature"
import { HttpError } from "../httpError"

export const validateBody =
  <T>(schema: Zod.Schema<T>) =>
  async (req: NextRequest | NextRequestWithBody) => {
    try {
      const hasBody = hasParsedBody(req)

      const parseResult = schema.safeParse(hasBody ? req.parsedBody : await req.json())
      if (!parseResult.success) throw new HttpError("BadRequest", 400)

      const reqWithBody: NextRequestWithValidBody<T> = Object.assign(req, { validBody: parseResult.data })

      return reqWithBody
    } catch {
      throw new HttpError("BadRequest", 400)
    }
  }

export type NextRequestWithValidBody<T> = NextRequest & { validBody: T }
