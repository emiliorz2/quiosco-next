"use client"
import { useRouter } from 'next/navigation'

export default function GoBackButton() {
    const router = useRouter()
    return (
        <>
            <button
                onClick={() => router.back()}
                className="mutz-btn-secondary w-full cursor-pointer lg:w-auto"
            >Volver</button>
        </>
    )
}
