import { redirect } from "next/navigation";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import ProductTable from "@/components/products/ProductTable"
import ProductsPagination from "@/components/products/ProductsPagination";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";


async function productCount() {
  const count = await prisma.product.count()
  return count
}

async function getProducts(page: number, pageSize: number) {
  
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    take: pageSize,
    skip: skip,
    include: {
      category: true
    }
  });
  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>> //typescript infiere lo q retorna la funcion

type ProductsPageProps = {
  searchParams: Promise<{ page?: string }>
}

export default async function ProductsPage({searchParams}: ProductsPageProps) {
  const { page: pageParam } = await searchParams

  const page = Number(pageParam) || 1;
  const pageSize = 10;

  if(page < 1) redirect('/admin/products')

  //esto hace q las consultas sean paralelas
  const productsData =  getProducts(page, pageSize);
  const totalProductsData =  productCount();
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])

  //esto es para saber cuantas paginas hay
  const totalPages = Math.ceil(totalProducts / pageSize);

  //esto es para q si la pagina es mayor a la cantidad de paginas q hay, redirija a la primera pagina
  if (page > totalPages) {
    redirect('/admin/products')
  }

  return (
    <>
      <p className="mutz-subtitle mb-2">Mutz Pizzeria</p>
      <Heading>
        Administrar productos
      </Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={'/admin/products/new'}
          className="mutz-btn-primary w-full cursor-pointer lg:w-auto"
        >Crear Producto</Link>

        <ProductSearchForm />
      </div>


      <ProductTable
        products={products}
      />
      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}

