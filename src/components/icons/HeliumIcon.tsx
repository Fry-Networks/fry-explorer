import Image from "next/image";

export function HeliumIcon(props: { className?: string }) {
  return (
   //import the logo.svg file from the public folder
    <Image
      src="/logo.svg"
      alt="Helium"
      width={2}
      height={100}
      className={props.className}
    />
  )
}
