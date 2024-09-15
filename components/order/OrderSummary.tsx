"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/createOrder-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"


export default function OrderSummary() {

  const order = useStore(state => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

  const clearOrder = useStore(state => state.clearOrder)

  const handleCreateOrder = async (formData: FormData) => {
    // Create the order
    const data = {
      name: formData.get('name'),
      total,
      order
    }
    
    const result = OrderSchema.safeParse(data)
    console.log(result)
    if (!result.success){
      result.error.issues.forEach(issue => {
        toast.error(issue.message)
      })
      return
    }
    
    const response = await createOrder(data)
    if(response?.errors) {
      response.errors.forEach(issue => {
        toast.error(issue.message)
      })
    }
    toast.success('Orden creada exitosamente')
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>

      {order.length === 0 ? <p className="text-center my-10">No hay productos en tu pedido</p> : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails
              key={item.id}
              item={item}
            />
          ))}

          <p className="text-2xl mt-20 text-center">
            Total a Pagar: {''}
            <span className="font-black text-amber-500">
              {formatCurrency(total)}
            </span>
          </p>

          <form 
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder}
          >

            <input type="text"
            className="py-2 rounded border border-gray-300 w-full text-center"
            placeholder="Nombre"
            name="name"
            />

            <input type="submit"
            className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
            value="Pagar"
            />
            
          </form>

        </div>
      )}
    </aside>
  )
}
