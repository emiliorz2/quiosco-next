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
    <aside className="md:w-80 lg:h-screen lg:w-96 lg:overflow-y-scroll p-5">
      <div className="mutz-panel p-5">
      <h2 className="mutz-section-title text-center">Mi pedido</h2>
      <p className="mutz-hint mt-1 text-center">Resumen en CRC</p>

      {order.length === 0 ? <p className="mutz-description my-10 text-center">No hay productos en tu pedido</p> : (
        <div className="mt-5 space-y-4">
          {order.map((item) => (
            <ProductDetails
              key={item.id}
              item={item}
            />
          ))}

          <p className="mt-8 text-center text-lg font-semibold text-[#D0C8BA]">
            Total a Pagar: {''}
            <span className="ml-1 text-xl font-black text-[#E44232]">
              {formatCurrency(total)}
            </span>
          </p>

          <form 
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder}
          >

            <input type="text"
            className="mutz-input text-center"
            placeholder="Nombre"
            name="name"
            />

            <input type="submit"
            className="mutz-btn-primary cursor-pointer"
            value="Pagar"
            />
            
          </form>

        </div>
      )}
      </div>
    </aside>
  )
}
