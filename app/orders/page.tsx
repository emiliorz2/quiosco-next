"use client"
import LatestOrderItem from "@/components/order/LatestOrderItem"
import Logo from "@/components/ui/Logo"
import { OrderWithProducts } from "@/src/types"
import useSWR from "swr"




export default function OrdersPage() {
    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 1000,
        revalidateOnFocus: false,
    })
    if (isLoading) return <p className="mutz-description p-6">Cargando...</p>
    if (data) return (
        <div className="mutz-shell min-h-screen p-6">
            <p className="mutz-subtitle text-center">Mutz Pizzeria</p>
            <h1 className="mutz-title mt-3 text-center">Ordenes Listas</h1>

            <div className="mt-8">
                <Logo />
            </div>

            {data.length ? (
                <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
                    {data.map(order => (
                        <LatestOrderItem
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) : <p className="mutz-description my-10 text-center">No hay ordenes listas</p>}
        </div>
    )
}
