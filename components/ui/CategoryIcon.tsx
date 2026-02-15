"use client"
import Image from "next/image"
import { Category } from "@prisma/client"
import { useParams } from "next/navigation"
import Link from "next/link"

type CategoryIconProps = {
  category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {

  const params = useParams<{category: string}>()
  const isActive = category.slug === params.category
  const iconSlug = category.icon

  return (
    <Link
      className={`group flex items-center gap-4 rounded-xl border p-3 transition-all ${
        isActive
          ? "border-[#E44232] bg-[#E44232]/15"
          : "border-[#2A2A2A] bg-black/25 hover:border-[#E44232]/70 hover:bg-white/5"
      }`}
      href={`/order/${category.slug}`}
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-[#2A2A2A] bg-black/40 p-1">
        {iconSlug ? (
          <Image
            src={`/icon_${iconSlug}.svg`}
            alt={category.name}
            fill
            className="object-contain transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl font-black text-[#F5F1E6]">
            {category.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div>
        <p className="mutz-item-title">{category.name}</p>
        <p className="mutz-hint">
          {category.iconMissing ? "Icono pendiente" : "Categoria"}
        </p>
      </div>
    </Link>
  )
}
