import { MapCover } from "@/components/MapCover"
import { StatsList } from "./components/StatsList"
import FryInfo from "./components/FryInfo"
export default async function Page() {
  return (
    <MapCover title="Network Stats">
      <div className="ml-5 overflow-y-auto pr-2">
        <FryInfo />
      </div>
    </MapCover>
  )
}
