"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"
import { error } from "console"

export async function createOrder(data : unknown) {
    // Create the order
    const result = OrderSchema.safeParse(data)

    

    if (!result.success){
        return {
            errors: result.error.issues
        }
    }

    try {
        //aqui se ingresan ya los datos despues de las validaciones
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
    console.log(result.success)
}