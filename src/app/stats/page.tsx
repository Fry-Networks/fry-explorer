import { MapCover } from "@/components/MapCover"
import { Governance } from "./components/Governance"
import { NetworkUsage } from "./components/NetworkUsage"
import { SubDaoInfo } from "./components/SubDaoInfo"

export const revalidate = 300 // revalidate 5 minutes

export default async function Page() {
  return (
    <MapCover title="Network Stats">
      <div className="overflow-y-auto pr-2">
       
       
        <SubDaoInfo subDao={"iot"} />
       
        <SubDaoInfo subDao={"mobile"} />
       
        <NetworkUsage />
       
       
        <Governance />
      </div>
    </MapCover>
  )
}
