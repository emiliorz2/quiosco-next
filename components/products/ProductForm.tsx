import { prisma } from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload"
import { Product } from "@prisma/client"

async function getCategories() {
    // Aquí se haría la búsqueda de categorías
    const categories = await prisma.category.findMany()
    return categories
}

type ProductFormProps = {
    product?: Product
}

export default async function ProductForm({product}: ProductFormProps) {

    const categories = await getCategories()

    

    return (
        <>
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="name"
                >Nombre:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Nombre Producto"
                    defaultValue={product?.name} // Aquí se asigna el valor del nombre al editar
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="price"
                >Precio:</label>
                <input
                    id="price"
                    name="price"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Precio Producto"
                    defaultValue={product?.price} // Aquí se asigna el valor del precio al editar
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="categoryId"
                >Categoría:</label>
                <select
                    className="block w-full p-3 bg-slate-100"
                    id="categoryId"
                    name="categoryId"
                    defaultValue={product?.categoryId} // Aquí se asigna el valor de la categoría al editar
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category =>(
                        
                            <option 
                            key={category.id} 
                            value={category.id}
                            >{category.name}</option>
                        
                    ))}
                </select>
            </div>

            <ImageUpload 
                image={product?.image} // Aquí se asigna la imagen al editar
            />
        </>
    )
}