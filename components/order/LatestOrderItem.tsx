

import { OrderWithProducts } from "@/src/types"

type LatestOrderItemProps = {
    order: OrderWithProducts
}

export default function LatestOrderItem({order}: LatestOrderItemProps) {
  return (
    <div className="mutz-panel space-y-5 p-5">
        <p className="mutz-section-title">
            Cliente: {order.name}
        </p>

        <ul 
            className="divide-y divide-[#2A2A2A] border-t border-[#2A2A2A] text-sm font-medium text-[#C7C0B5]"
            role="list"
        >
            {order.orderProducts.map(product => (
                <li
                    key={product.id}
                    className="flex py-4 text-sm"
                >
                    <p>
                        <span className="font-bold text-[#D0C8BA]">
                            ({product.quantity}) {''}
                        </span>
                        {product.product.name}
                    </p>
                </li>
            ))}
        </ul>

    </div>
  )
}
