"use client"
import { useEffect, useState } from "react"
import { HexHotspotsClient, Miner } from "./HexHotspotsClient"

async function getMiners(hexId: string) {
  try {
    const response = await fetch(
      `${window.location.origin}/api/hexdata`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hexId: hexId }),
      }
    )
    if (!response.ok) return []
    const { miners } = (await response.json()) as { miners: Miner[] }
    return miners
  } catch {
    return []
  }
}

export function HexHotspotsData({ hexId }: { hexId: string }) {
  const [miners, setMiners] = useState<Miner[] | null>(null)

  useEffect(() => {
    getMiners(hexId).then(setMiners)
  }, [hexId])

  return <HexHotspotsClient miners={miners} />
}
