"use client"

import { CldUploadWidget } from "next-cloudinary"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"
import Image from "next/image"

export default function ImageUpload() {
    const [image, setImage] = useState('')
    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    //@ts-ignore
                    setImage(result.info?.secure_url)
                }
            }}
            uploadPreset='qbdyegjb'
            options={{
                maxFiles: 1

            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">Imagen Producto</label>
                        <div
                            onClick={() => open()}
                            className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 "
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className="text-lg font-semibold">Agregar Imagen</p>

                            {image && (
                                <div
                                    className='absolute inset-0 w-full h-full'
                                >
                                    <Image
                                        fill
                                        style={{objectFit: 'contain'}}
                                        src={image}
                                        alt='Imagen de Producto'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <input
                        type="hidden"
                        name="image"
                        value={image}
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
