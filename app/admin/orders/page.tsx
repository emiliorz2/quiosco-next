"use client"
import useSWR from "swr";
import OrderCard from "@/components/admin/OrderCard"
import Heading from "@/components/ui/Heading"
import { OrderWithProducts } from "@/src/types"



export default function OrdersPage() {

  const url = "/admin/orders/api"
  const fetcher = () => fetch(url).then((res) => res.json()).then((data) => data)
  const { data, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: false
  })

  if(isLoading) return <p className="mutz-description">Cargando...</p>

  if(data) return (
    <>
        <p className="mutz-subtitle mb-2">Mutz Pizzeria</p>
        <Heading>
            Administrar ordenes
        </Heading>


        {data.length ? (
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
                {data.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
        ): <p className="mutz-description text-center">No hay ordenes pendientes</p> }
    </>
  )
}
