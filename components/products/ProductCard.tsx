import { formatCurrency, getImagePath } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {

    const imagePath = getImagePath(product.image)

    return (
        <div className="mutz-card group overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                <Image
                    src={imagePath}
                    alt={`Product platillo ${product.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
            </div>
            <div className="space-y-3 p-5">
                <h3 className="mutz-item-title">{product.name}</h3>
                <p className="mutz-price text-lg">
                    {formatCurrency(product.price)}
                </p>
                <AddProductButton product={product} />
            </div>
        </div>
    )
}
