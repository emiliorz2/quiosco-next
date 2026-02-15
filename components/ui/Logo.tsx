import Image from "next/image";

const LOGO_FILE = "/mutz-logo.svg";

export default function Logo() {
  return (
    <div className="flex justify-center">
        <div className="relative h-40 w-40 overflow-hidden rounded-full bg-[#E04B37] p-2 shadow-lg shadow-black/60">
            <Image
                fill
                alt="Logo Mutz Pizzeria"
                className="rounded-full object-cover"
                src={LOGO_FILE}
            />
        </div>
        
    </div>
  )
}
