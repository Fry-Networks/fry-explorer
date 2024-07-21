"use client"
import { useEffect, useState } from "react"
import { StatItem } from "./StatItem"
import { StatsList } from "./StatsList"

export default function FryInfo() {
  const [data, setData] = useState({
    miners: 0,
    located: 0,
    verified: 0,
    online: 0,
  })
  useEffect(() => {
    fetch(
      `${window.location.origin}/api/stats`, // Construct the URL dynamically
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (response) => {
      const { miners, located, verified, online } = await response.json()
      setData({ miners, located, verified, online })
    })
  }, [])

  return (
    <StatsList title="Fry" icon="fry">
      <StatItem label="Miners" value={data.miners ?? 0} />
      <StatItem label="Located Miners" value={data.located ?? 0} />
      <StatItem label="Verified Miners" value={data.verified ?? 0} />
      <StatItem label="Online Miners" value={"N/A"} />
    </StatsList>
  )
}
