

import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import Heading from '@/components/ui/Heading'
import React from 'react'

export default function CreateProductPage() {
  return (
    <>
      <p className="mutz-subtitle mb-2">Mutz Pizzeria</p>
      <Heading>Agregar Nuevo producto</Heading>

      <AddProductForm >
        <ProductForm />
      </AddProductForm>
    </>
  )
}
