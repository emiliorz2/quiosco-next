"use client"
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"



export default function ProductSearchForm() {
  const router = useRouter()

  const handleSearchForm = (formDate : FormData) => {
    const data = {
      search: formDate.get('search')
    }
    const result = SearchSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }
    router.push(`/admin/products/search?search=${result.data.search}`)
  }

  return (
    <form 
    className="flex items-center gap-2"
    action={handleSearchForm}
    >
        <input 
        type="text" 
        placeholder="Buscar producto"
        className="mutz-input"
        name="search"
        />

        <input
        type="submit"
        value={'Buscar'}
        className="mutz-btn-secondary cursor-pointer"
        />

    </form>
  )
}
