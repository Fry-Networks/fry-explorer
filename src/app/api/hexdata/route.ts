import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongoclient"

export async function POST(request: Request) {
  const data = await request.json()
  const { hexId } = data
  if (!hexId || typeof hexId !== "string" || hexId.trim().length === 0) {
    return NextResponse.json({ message: "Invalid hexId" }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db("main")
    const collection = db.collection("devices")
    const miners = (await collection
      .find({ hexId: hexId })
      .toArray()) as unknown as Miner[]
    const clean = miners.map((miner) => {
      return {
        nickname: miner.nickname,
        name: miner.name,
        verified: miner.verified,
        hexId: miner.hexId,
        address: miner.address,
      }
    })
    return NextResponse.json({ message: "ok", miners: clean })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "error" }, { status: 500 })
  }
}

interface Miner {
  _id: string
  user_id: string
  nickname?: string
  miner_key: string
  name: string
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
