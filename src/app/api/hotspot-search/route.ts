import { NextResponse } from "next/server"

const HOTSPOTTY_API_URL =
  process.env.HOTSPOTTY_EXPLORER_API_URL ||
  "https://beta-api.hotspotty.net/api/v1/explorer"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name")

  if (!name) {
    return NextResponse.json({ error: "Missing 'name' parameter" }, { status: 400 })
  }

  const token = process.env.HOTSPOTTY_EXPLORER_API_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: "Search unavailable — Hotspotty API token not configured" },
      { status: 503 }
    )
  }

  try {
    const searchUrl = new URL(`${HOTSPOTTY_API_URL}/search`)
    searchUrl.searchParams.append("name", name.trim().replaceAll(" ", "-"))

    const response = await fetch(searchUrl.toString(), {
      headers: {
        Authorization: `bearer ${token}`,
      },
      next: { revalidate: 10 },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Hotspotty API returned ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Hotspot search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
