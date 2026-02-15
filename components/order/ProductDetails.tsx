import { useStore } from "@/src/store";
import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";


type ProductDetailsProps = {
    item: OrderItem
};

const MIN_QUANTITY = 1
const MAX_QUANTITY = 10

export default function ProductDetails({ item }: ProductDetailsProps) {

    const increaseQuantity = useStore(state => state.increaseQuantity)
    const decreaseQuantity = useStore(state => state.decreaseQuantity)
    const removeItem = useStore(state => state.removeItem)
    const disableDecrease = useMemo(() => item.quantity === MIN_QUANTITY, [item.quantity])
    const disableIncrease = useMemo(() => item.quantity === MAX_QUANTITY, [item.quantity])

    return (
        <div className="mutz-card p-4">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="mutz-item-title">{item.name} </p>

                    <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                    >
                        <XCircleIcon className="h-7 w-7 text-[#E44232]" />
                    </button>
                </div>
                <p className="text-lg font-black text-[#E44232]">
                    {formatCurrency(item.price)}
                </p>
                <div className="flex w-fit items-center gap-5 rounded-lg border border-[#2A2A2A] bg-black/40 px-4 py-2">
                    <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={disableDecrease}
                        className="text-[#F5F1E6] disabled:opacity-50"
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>

                    <p className="text-lg font-black text-[#F5F1E6]">
                        {item.quantity}
                    </p>

                    <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        disabled={disableIncrease}
                        className="text-[#F5F1E6] disabled:opacity-50"
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A79E90]">
                    Subtotal: {''}
                    <span className="ml-1 text-base font-black text-[#E44232]">
                        {formatCurrency(item.subtotal)}
                    </span>
                </p>
            </div>
        </div>
    )
}
