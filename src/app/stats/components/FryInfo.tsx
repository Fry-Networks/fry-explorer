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
  })

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/stats`, // Construct the URL dynamically
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const { miners, registered, located, verified, online } =
        await response.json()
      setData({ miners, registered, located, verified, online })
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData() // Fetch data initially when component mounts

    const interval = setInterval(() => {
      fetchData() // Fetch data every 10 minutes
    }, 10 * 60 * 1000)

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  return (
    <StatsList title="Fry" icon="fry">
      <StatItem label="Miners" value={data.miners ?? 0} />
      <StatItem label="Registered Miners" value={data.registered ?? 0} />
      <StatItem label="Located Miners" value={data.located ?? 0} />
      <StatItem label="Verified Miners" value={data.verified ?? 0} />
      <StatItem label="Online Miners" value={"N/A"} />
    </StatsList>
  )
}
