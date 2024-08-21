"use client"
import { useTheme } from "next-themes"
import Image from "next/image"

export function FryIcon(props: { className?: string }) {
  const { resolvedTheme } = useTheme()
  console.log(resolvedTheme)
  return (
    //import the logo.svg file from the public folder
    <Image
      src={resolvedTheme == "light" ? "/logo_light.svg" : "/logo_dark.svg"}
      alt="Fry"
      width={2}
      height={100}
      className={props.className}
    />
  )
}
