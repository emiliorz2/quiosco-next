import OrderCard from "@/components/admin/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getPendingOrders() {
  // Fetch orders from the database
  const orders = prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return orders
}

export default async function page() {

    const orders = await getPendingOrders()
    console.log(JSON.stringify(orders, null, 2))

  return (
    <>
        <Heading>
            Administrar ordernes
        </Heading>

        {orders.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
        ): <p className="text-center"> No hay ordenes pendientes</p> }
    </>
  )
}
