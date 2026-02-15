import { completeOrder } from "@/actions/completeOrder-action";
import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";

type OrderCardProps = {
    order: OrderWithProducts;
}

export default function OrderCard({ order }: OrderCardProps) {

    

    return (
        <section
            aria-labelledby="summary-heading"
            className="mutz-panel space-y-4 px-4 py-6 sm:p-6 lg:p-8"
        >
            <p className='mutz-section-title'>Cliente: {order.name}</p>
            <p className='mutz-subtitle'>Productos ordenados</p>
            <dl className="mt-6 space-y-4">
                {order.orderProducts.map(product => (
                    <div
                        key={product.id}
                        className="flex items-center gap-2 border-t border-[#2A2A2A] pt-4"
                    >
                        <dt className="flex items-center text-sm text-[#A79E90]">
                            <span className="font-black">({product.quantity}) {''}</span>
                        </dt>
                        <dd className="text-sm font-medium text-[#F5F1E6]">{product.product.name}</dd>
                    </div>
                ))}
                <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-4">
                    <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A79E90]">Total a pagar</dt>
                    <dd className="text-base font-black text-[#E44232]">{formatCurrency(order.total)}</dd>
                </div>
            </dl>

            <form action={completeOrder}>
                <input
                type="hidden"
                name="order_id"
                value={order.id}
                />
                <input
                    type="submit"
                    className="mutz-btn-primary mt-5 cursor-pointer"
                    value='Marcar Orden Completada'
                />
            </form>
        </section>
    )
}
