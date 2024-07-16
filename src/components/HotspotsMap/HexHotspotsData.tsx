"use client"
import { useEffect, useState } from "react"
import { HexHotspotsClient, Miner } from "./HexHotspotsClient"

async function getMiners(hexId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hexdata`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hexId: hexId }),
    }
  )
  const { miners } = (await response.json()) as { miners: Miner[] }
  return miners
}

export function HexHotspotsData({ hexId }: { hexId: string }) {
  const [miners, setMiners] = useState<Miner[] | null>(null)

  useEffect(() => {
    getMiners(hexId).then(setMiners)
  }, [hexId])

  return <HexHotspotsClient miners={miners} />
}
