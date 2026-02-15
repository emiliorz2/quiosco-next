"use client"

import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({ product }: AddProductButtonProps) {

    const addToOrder = useStore(state => state.addToOrder)

    return (
        <button
            type="button"
            className="mutz-btn-primary mt-2 cursor-pointer"
            onClick={() => addToOrder(product)}
        >
            Agregar
        </button>
    )
}
