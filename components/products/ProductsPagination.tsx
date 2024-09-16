import Link from "next/link";

type ProductsPaginationProps = {
    page: number
    totalPages: number
}

export default function ProductsPagination({ page, totalPages }: ProductsPaginationProps) {
    
    // esto lo que hace es crear un array de numeros que va desde 1 hasta el total de paginas
    const pages = Array.from({ length: totalPages}, (_, i) => i + 1 )

    return (
        <nav className="flex justify-center py-10">

            {page > 1 && (
                <Link 
                href={`/admin/products?page=${page - 1}`}
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >&laquo;</Link>
            )}

            {pages.map((pageNumber) => (
                <Link key={pageNumber} href={`/admin/products?page=${pageNumber}`}
                    className={`bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${pageNumber === page ? 'bg-slate-600' : ''}`}
                >{pageNumber}</Link>
            ))}
                

            {page < totalPages && (
                <Link href={`/admin/products?page=${page + 1}`}
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >&raquo;</Link>
            )}
        </nav>
    )
}
