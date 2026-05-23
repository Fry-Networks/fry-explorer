import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongoclient"

const RESULTS_LIMIT = 20

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get("name")

  if (!name || name.trim().length < 2) {
    return NextResponse.json(
      { error: "Query must be at least 2 characters" },
      { status: 400 }
    )
  }

  try {
    const client = await clientPromise
    const db = client.db("main")
    const collection = db.collection("devices")

    const searchTerm = escapeRegex(name.trim().toLowerCase())

    const miners = await collection
      .find({ name: { $regex: searchTerm, $options: "i" } })
      .project({
        _id: 0,
        name: 1,
        hexId: 1,
        address: 1,
        position: 1,
        verified: 1,
      })
      .limit(RESULTS_LIMIT)
      .toArray()

    const results = miners.map((miner: any) => ({
      hotspot_id: miner.address || "",
      location_res8: miner.hexId || "",
      location_res12: miner.hexId || "",
      name: miner.name || "",
    }))

    return NextResponse.json(results)
  } catch (error) {
    console.error("Hotspot search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
