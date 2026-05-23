"use client"
import { useEffect, useState } from "react"
import { StatItem } from "./StatItem"
import { StatsList } from "./StatsList"

export default function FryInfo() {
  const [data, setData] = useState({
    miners: 0,
    registered: 0,
    located: 0,
    verified: 0,
    online: 0,
    loaded: false,
  })

  const fetchData = async () => {
    try {
      console.log("update data", window.location.origin)
      const response = await fetch(
        `/api/stats?timestamp=${new Date().getTime()}`, // Cache-busting query param
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const { miners, registered, located, verified, online } =
        await response.json()
      setData({ miners, registered, located, verified, online, loaded: true })
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData() // Fetch data initially when component mounts

    const interval = setInterval(() => {
      fetchData() // Fetch new data every 10 minutes (600,000 ms)
    }, 600_000) // 10 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <StatsList title="Fry" icon="fry">
      <StatItem label="Miners" value={data.loaded ? data.miners : "..."} />
      <StatItem
        label="Registered Miners"
        value={data.loaded ? data.registered : "..."}
      />
      <StatItem
        label="Located Miners"
        value={data.loaded ? data.located : "..."}
      />
      <StatItem
        label="Verified Miners"
        value={data.loaded ? data.verified : "..."}
      />
      <StatItem label="Online Miners" value={"N/A"} />
    </StatsList>
  )
}
