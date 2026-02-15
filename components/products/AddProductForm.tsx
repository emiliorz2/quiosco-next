"use client"

import { createProduct } from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"




export default function AddProductForm({children}: {children: React.ReactNode}) {

    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        const result = await ProductSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })

            return
        }

        const response = await createProduct(result.data)
        if (response?.errors) {
            response.errors.forEach(error => {
                toast.error(error.message)
            })
            return
        }
        toast.success('Producto creado exitosamente')
        router.push('/admin/products')
    }
  return (
    <div className="mutz-panel mx-auto mt-8 max-w-3xl px-5 py-8">
        <form
        className="space-y-5"
        action={handleSubmit}
        >
            {children}

            <input 
            type="submit" 
            className="mutz-btn-primary mt-5 cursor-pointer"
            value={'Registrar Producto'}
            />

        </form>
    </div>
  )
}
