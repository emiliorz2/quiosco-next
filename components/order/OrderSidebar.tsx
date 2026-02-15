
import { prisma } from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'




async function getCategories() {
  const categories = await prisma.category.findMany()
  const categoryOrder = ["pizza", "bread", "dessert", "drink", "wine"]
  return categories.sort(
    (a, b) => categoryOrder.indexOf(a.type) - categoryOrder.indexOf(b.type)
  )
}

export default async function OrderSidebar() {

  const categories = await getCategories()
  
  
  return (
    <aside className='md:h-screen md:w-80 md:overflow-y-auto border-r border-[#2A2A2A] bg-black/70 p-5 backdrop-blur-sm'>
        <Logo />
        <div className='mt-6 space-y-3 text-center'>
          <p className='mutz-subtitle'>Pizza Napoletana artesanal</p>
          <p className='mutz-hint'>San Lorenzo, Flores, Heredia</p>
          <p className='text-sm font-semibold text-[#D0C8BA]'>+506 8372 9888</p>
        </div>

        <nav className='mt-8 space-y-2'>
          {categories.map((category) =>  (
            <CategoryIcon key={category.id} category={category} />
          ))}
        </nav>

    </aside>
  )
}
