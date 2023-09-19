import { NextRequest, NextResponse } from "next/server"
import { runReport } from "./analytics"

export async function GET(req: NextRequest, { params }: { params: { lang: string } }) {
  const result = await runReport(params.lang)

  return NextResponse.json(result)
}
