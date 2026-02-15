import { prisma } from "@/src/lib/prisma";
import ImageUpload from "./ImageUpload";
import { Product } from "@prisma/client";

async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

type ProductFormProps = {
  product?: Product;
};

export default async function ProductForm({ product }: ProductFormProps) {
  const categories = await getCategories();

  return (
    <>
      <div className="space-y-2">
        <label className="mutz-subtitle block" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="mutz-input"
          placeholder="Nombre del producto"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2">
        <label className="mutz-subtitle block" htmlFor="price">
          Precio
        </label>
        <input
          id="price"
          name="price"
          className="mutz-input"
          placeholder="Precio en CRC"
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2">
        <label className="mutz-subtitle block" htmlFor="categoryId">
          Categoria
        </label>
        <select
          className="mutz-input"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <ImageUpload image={product?.image} />
    </>
  );
}
