import { ProductsWithCategory } from "@/app/admin/products/page";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";

type ProductTableProps = {
  products: ProductsWithCategory;
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="mutz-panel mt-8 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#2A2A2A]">
          <thead className="bg-black/30">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[#A79E90]"
              >
                Producto
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[#A79E90]"
              >
                Precio
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-[#A79E90]"
              >
                Categoria
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.2em] text-[#A79E90]"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]">
            {products.map((product) => (
              <tr key={product.id} className="bg-black/10">
                <td className="px-4 py-4 text-sm font-semibold text-[#F5F1E6]">
                  {product.name}
                </td>
                <td className="px-4 py-4 text-sm font-bold text-[#E44232]">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-4 py-4 text-sm text-[#C7C0B5]">
                  {product.category.name}
                </td>
                <td className="px-4 py-4 text-right text-sm">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="font-semibold uppercase tracking-[0.15em] text-[#D0C8BA] transition hover:text-[#E44232]"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
