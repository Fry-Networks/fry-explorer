"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

function isValidAlgorandAddress(address: string): boolean {
  if (!address || address.length !== 58) return false
  const base32Regex = /^[A-Z2-7]+$/
  return base32Regex.test(address)
}

export const AccountDetails = () => {
  const { address } = useParams<{ address: string }>()

  if (!isValidAlgorandAddress(address)) {
    return (
      <div className="flex-column justify-between text-zinc-800 dark:text-slate-100 sm:items-center">
        <p className="text-red-500">Invalid Algorand address format. Please provide a valid base32-encoded address.</p>
      </div>
    )
  }

  return (
    <div className="flex-column justify-between text-zinc-800 dark:text-slate-100 sm:items-center">
      <p>View Account-specific data on:</p>
      <ul className="p-4">
        <li className="flex">
          <Link
            href={`https://allo.info/account/${address}`}
            className="flex gap-2 rounded-xl p-3 border-zinc-900/5 bg-white text-zinc-800 shadow dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Allo Explorer</p>
          </Link>
        </li>
      </ul>
    </div>
  )
}
