import { MapCover } from "@/components/MapCover"
import Link from "next/link"

export default function NotFound() {
  return (
    <MapCover title="Page Not Found">
      <div className="flex flex-col items-center gap-4 py-8">
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Back to Map
        </Link>
      </div>
    </MapCover>
  )
}
