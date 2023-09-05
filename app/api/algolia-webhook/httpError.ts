import { NextResponse } from "next/server"

export class HttpError extends Error {
  status: number
  tag: string
  readonly isHttpError = true

  constructor(tag: string, status: number) {
    super()
    this.tag = tag
    this.status = status
  }
}

export function isHttpError(error: unknown): error is HttpError {
  return (error as HttpError).isHttpError
}

export function errorToNextResponse(error: unknown) {
  if (!isHttpError(error)) return NextResponse.json({ message: "UnexpectedError" }, { status: 500 })
  return NextResponse.json({ message: error.tag }, { status: error.status })
}
