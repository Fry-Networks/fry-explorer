"use client"
import { useEffect, useState } from "react"
import { HexHotspotsClient, Miner } from "./HexHotspotsClient"

async function getMiners(hexId: string) {
  console.log(window.location.origin)
  const response = await fetch(
    `${window.location.origin}/api/hexdata`, // Construct the URL dynamically
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
