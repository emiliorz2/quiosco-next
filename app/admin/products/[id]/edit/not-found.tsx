import Heading from "@/components/ui/Heading";
import Link from "next/link";



export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl text-center">
        <p className="mutz-subtitle mb-2">Mutz Pizzeria</p>
        <Heading>Producto No Encontrado</Heading>

        <Link
            href="/admin/products"
            className="mutz-btn-primary inline-block w-full cursor-pointer lg:w-auto"
        >Ir a productos</Link>
    </div>
  )
}
