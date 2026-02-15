"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
    link: {
        url: string;
        text: string;
        blank: boolean;
    }
}

export default function AdminRoute({ link }: AdminRouteProps) {
    const pathName = usePathname()
    const isActive = pathName.startsWith(link.url)
    return (
        <Link 
        href={link.url}
        className={`rounded-xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-all ${
            isActive
              ? "border-[#E44232] bg-[#E44232]/15 text-[#F5F1E6]"
              : "border-[#2A2A2A] bg-black/25 text-[#D0C8BA] hover:border-[#E44232]/70 hover:bg-white/5"
        }`}
        target={link.blank ? '_blank' : undefined}
        rel={link.blank ? "noreferrer" : undefined}
        >
            
                {link.text}
            
        </Link>
    )
}
