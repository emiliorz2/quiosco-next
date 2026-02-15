import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProductsPagination({
  page,
  totalPages,
}: ProductsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-8 flex flex-wrap justify-center gap-2 pb-6">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="mutz-btn-secondary px-3 py-2"
        >
          «
        </Link>
      )}

      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={`/admin/products?page=${pageNumber}`}
          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
            pageNumber === page
              ? "border-[#E44232] bg-[#E44232]/20 text-[#F5F1E6]"
              : "border-[#2A2A2A] bg-black/25 text-[#C7C0B5] hover:border-[#E44232]/70 hover:text-[#F5F1E6]"
          }`}
        >
          {pageNumber}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="mutz-btn-secondary px-3 py-2"
        >
          »
        </Link>
      )}
    </nav>
  );
}
