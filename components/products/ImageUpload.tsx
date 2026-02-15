"use client"
import { getImagePath } from '@/src/utils'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

export default function ImageUpload({image} : {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if(result.event === 'success') {
                    widget.close()
                    // @ts-expect-error: result.info might be undefined, but we expect secure_url after a successful upload
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset='qbdyegjb'
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => (
                <>
                    <div className='space-y-2'>
                        <label className='mutz-subtitle block'>Imagen del producto</label>
                        <div
                            className='relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-[#2A2A2A] bg-black/30 p-10 text-[#C7C0B5] transition hover:border-[#E44232]/70 hover:bg-white/5'
                            onClick={() => open()}
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className='text-sm font-semibold uppercase tracking-[0.2em]'>Agregar imagen</p>

                            {imageUrl && (
                                <div
                                    className='absolute inset-0 h-full w-full overflow-hidden rounded-xl'
                                >
                                    <Image
                                        fill
                                        style={{objectFit: 'cover'}}
                                        src={imageUrl}
                                        alt='Imagen de Producto'
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageUrl && (
                        <div className='space-y-2'>
                            <label className='mutz-subtitle block'>Imagen actual</label>
                            <div className='relative h-48 w-64 overflow-hidden rounded-xl border border-[#2A2A2A]'>
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt="Imagen Producto"
                                    style={{objectFit: 'cover'}}
                                />
                            </div>
                        </div>
                    )}

                    <input
                        type='hidden'
                        name='image'
                        defaultValue={imageUrl ? imageUrl : image }
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
