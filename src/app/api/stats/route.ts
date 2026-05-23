import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongoclient"

let cachedData: {
  miners: number
  registered: number
  located: number
  verified: number
  online: number
} | null = null
let lastUpdated = 0
const UPDATE_INTERVAL = 600_000 // 10 minutes in milliseconds
async function updateCache() {
  console.log("Updating cache")
  try {
    const client = await clientPromise
    const db = client.db("main")
    const collection = db.collection("devices")
    const [total, registered, verified, located] = await Promise.all([
      collection.countDocuments({}),
      collection.countDocuments({ is_registered: true }),
      collection.countDocuments({ verified: true }),
      collection.countDocuments({ position: { $exists: true } }),
    ])

    cachedData = {
      miners: total,
      registered,
      located,
      verified,
      online: total, // Placeholder: no online field in schema
    }
    console.log("Cache updated")
    console.log(cachedData)
    lastUpdated = Date.now()
  } catch (error) {
    console.error("Failed to update cache", error)
  }
}

// Initialize the cache on server start
updateCache()

// Schedule cache updates
setInterval(updateCache, UPDATE_INTERVAL)

export async function GET(request: Request) {
  try {
    // If the cache is stale or not yet initialized, wait for an update
    if (!cachedData || Date.now() - lastUpdated > UPDATE_INTERVAL) {
      await updateCache()
    }

    console.log("Cache updated before send")
    console.log(cachedData)
    if (!cachedData) {
      return NextResponse.json({ message: "Stats temporarily unavailable — database connection failed" }, { status: 503 })
    }
    return NextResponse.json({
      message: "ok",
      ...cachedData,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}

interface Device {
  _id: string
  user_id: string
  nickname?: string
  miner_key: string
  name: string
  apikey?: string
  mac?: string
  byod?: string
  created_at: Date
  position?: {
    lat: number
    lng: number
  }
  verified: boolean
  reward_wallet?: string
  is_registered: boolean
  hexId?: string
  address: string
  email: string
  __v: number
}
