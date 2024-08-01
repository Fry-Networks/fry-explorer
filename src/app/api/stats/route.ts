import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongoclient"

export async function GET(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("main")
    const collection = db.collection("devices")
    const miners = (await collection.find({}).toArray()) as unknown as Device[]
    const registered = miners.filter((miner) => miner.is_registered).length
    const verified = miners.filter((miner) => miner.verified).length
    const located = miners.filter((miner) => miner.position).length
    const online = 150

    return NextResponse.json({
      message: "ok",
      miners: miners.length,
      registered: registered,
      located: located,
      verified: verified,
      online: online,
    })
  } catch (error) {
    console.log(error)
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
