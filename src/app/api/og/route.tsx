import { ImageResponse, NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const image = searchParams.get("image")
  const title = searchParams.get("title")

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "white",
          backgroundImage: `url("${image}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          padding: "50px",
          textAlign: "start",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          textShadow: "1px 1px 4px rgba(66, 68, 90, 1)",
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
