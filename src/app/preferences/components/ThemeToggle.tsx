"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useTheme } from "next-themes"
import { useSearchParams } from "next/navigation"
import { PropsWithChildren } from "react"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2 pl-2">
      <button
        type="button"
        aria-label="Toggle dark mode"
        className="group flex gap-2"
        onClick={() => setTheme("light")}
      >
        <p
          className={clsx(
            "transition group-hover:text-red-500 dark:group-hover:text-red-400",
            theme === "light" ? "text-red-500 dark:text-red-400" : ""
          )}
        >
          Light
        </p>
        <SunIcon
          className={clsx(
            "h-6 w-6 transition group-hover:stroke-red-500 dark:group-hover:stroke-red-400",
            theme === "light" ? "text-red-500 dark:text-red-400" : ""
          )}
        />
      </button>
      <p>-</p>
      <button
        type="button"
        aria-label="Toggle dark mode"
        className="group flex gap-2"
        onClick={() => setTheme("dark")}
      >
        <p
          className={clsx(
            "transition group-hover:text-red-500 dark:text-red-400 dark:group-hover:text-red-400",
            theme === "dark" ? "text-red-500 dark:text-red-400" : ""
          )}
        >
          Dark
        </p>
        <MoonIcon
          className={clsx(
            "h-6 w-6 transition group-hover:stroke-red-500 dark:group-hover:stroke-red-400",
            theme === "dark" ? "text-red-500 dark:text-red-400" : ""
          )}
        />
      </button>
    </div>
  )
}

// do not want to show theme toggle when selecting hotspot for the first time
export const ConditionalThemeToggle = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")

  if (redirect) return null
  return <>{children}</>
}
