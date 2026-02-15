import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(search: string) {
    // Aquí se haría la búsqueda de productos
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: search,
                //esto es para que no sea case sensitive osea que no importe si es mayuscula o minuscula
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}

type SearchPageProps = {
    searchParams: Promise<{ search?: string | string[] }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { search } = await searchParams
    const searchTerm = Array.isArray(search) ? search[0] : (search ?? '')
    const products = await searchProducts(searchTerm)
    return (
        <>
            <p className="mutz-subtitle mb-2">Mutz Pizzeria</p>
            <Heading>
                Resultados de busqueda: {searchTerm}
            </Heading>

            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">


                <ProductSearchForm />
            </div>
            {products.length ? (
                
                <ProductTable
                    products={products}
                />
            ):(
                <p className="mutz-description text-center text-lg">No se encontraron productos</p>
            )}
        </>
    )
}
