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
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={image ?? undefined}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <p
          style={{
            position: "absolute",
            padding: "40px 60px",
            top: 0,
            left: 0,
            color: "white",
            textShadow: "1px 1px 4px rgba(66, 68, 90, 1)",
            fontSize: 50,
          }}
        >
          {title}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
