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

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
    const products = await searchProducts(searchParams.search)
    return (
        <>
            <Heading>
                Resultados de busqueda: {searchParams.search}
            </Heading>

            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">


                <ProductSearchForm />
            </div>
            {products.length ? (
                
                <ProductTable
                    products={products}
                />
            ):(
                <p className="text-center text-lg">No se encontraron productos</p>
            )}
        </>
    )
}