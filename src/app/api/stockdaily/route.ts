import { NextResponse } from "next/server"

const data = [
  {
    id: "clmhu3hb76bli09vzjsm5ha3x",
    name: "S&P 500",
    change: "-2.1600",
  },
  {
    id: "clmhu869v6cqg09vzu72abtgy",
    name: "Apple",
    change: "+1.8600",
  },
  {
    id: "clmhu8gwj6cs009vz07dlwsnv",
    name: "Amazon",
    change: "-2.5400",
  },
  {
    id: "clmhu901k6csw09vzvd2wl6dv",
    name: "Microsoft",
    change: "-3.4300",
  },
  {
    id: "clmhu8qjmbc6q0aw2i7uk751h",
    name: "Google",
    change: "+1.6100",
  },
]

export async function GET() {
  return NextResponse.json({ data }, { status: 200 })
}
