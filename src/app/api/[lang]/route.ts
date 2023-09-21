import { NextResponse } from "next/server"
import { Locale } from "@/i18n/i18n"
import generateRssFeed from "./generateRssFile"

export async function GET(request: Request, { params }: { params: { lang: Locale } }) {
  try {
    const rssContent = await generateRssFeed(params.lang)
    return new Response(rssContent, { status: 200, headers: { "Content-Type": "application/xml" } })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ status: 500, message: "Something went wrong!", error: err })
  }
}
