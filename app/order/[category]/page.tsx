import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"


async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    },
    orderBy: [
      {
        displayOrder: "asc",
      },
      {
        name: "asc",
      },
    ],
  })
  return products
}

type OrderPageProps = {
  params: Promise<{ category: string }>
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { category } = await params
  const products = await getProducts(category)

  return (
    <>
      <p className="mutz-subtitle mb-2">Mutz Pizzeria</p>
      <Heading>Elige y personaliza tu pedido</Heading>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
