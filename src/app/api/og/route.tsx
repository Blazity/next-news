/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ImageResponse, NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const image = searchParams.get("image")
  const title = searchParams.get("title")

  console.log({ image, title })

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
            bottom: 0,
            left: 0,
            color: "white",
            textShadow: "0px 1px 4px rgba(26, 26, 27, 1)",
            fontSize: "3rem",
            fontWeight: 800,
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
