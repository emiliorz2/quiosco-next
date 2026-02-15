"use client"

import { updateProduct } from "@/actions/update-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useParams } from "next/navigation"




export default function EditProductForm({children}: {children: React.ReactNode}) {

    const router = useRouter()
    const params = useParams()
    const id = +params.id!

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

        

        const response = await updateProduct(result.data, id)
        if (response?.errors) {
            response.errors.forEach(error => {
                toast.error(error.message)
            })
            return
        }
        toast.success('Producto actualizado exitosamente')
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
            value={'Guardar Cambios'}
            />

        </form>
    </div>
  )
}
