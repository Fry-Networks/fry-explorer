"use client"

import clsx from "clsx"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { NAVIGATION_LINKS } from "./constants"

function NavItem({
  href,
  layoutSegments,
  children,
}: {
  href: string
  layoutSegments: (string | null)[]
  children: React.ReactNode
}) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const isActive = layoutSegments.includes(selectedLayoutSegment)

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-red-500 dark:text-red-400"
            : "hover:text-red-500 dark:hover:text-red-400"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0 dark:from-red-400/0 dark:via-red-400/40 dark:to-red-400/0" />
        )}
      </Link>
    </li>
  )
}

export function DesktopNavigation(props: { className?: string }) {
  return (
    <nav {...props}>
      <ul className="flex px-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {NAVIGATION_LINKS.map(({ title, href, layoutSegments }) => (
          <NavItem key={href} href={href} layoutSegments={layoutSegments}>
            {title}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}
