import Image from "next/image"

export function FryIcon(props: { className?: string }) {
  return (
    //import the logo.svg file from the public folder
    <Image
      src="/logo.svg"
      alt="Fry"
      width={2}
      height={100}
      className={props.className}
    />
  )
}
