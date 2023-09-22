'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import assets from '@/assets'
import appConfig from '@/utils/appConfig'

function ShoeBox({ showProduct }) {
    const router = useRouter()
    const handleShowProductDetail = () => {
        router.push(`/products/${showProduct.id}`)
    }

    return (
        <div className='flex flex-col w-[30%] mb-10 mb:mx-auto mb:w-[45%] '>
            <div className='w-full h-auto items-center mb-5 overflow-hidden'>
                <Image
                    src={
                        showProduct && showProduct?.image
                            ? `${appConfig.BACKEND_URL}/${showProduct.image}`
                            : assets.images.sample
                    }
                    width={300}
                    height={300}
                    alt={showProduct.productName}
                    className='w-full cursor-pointer object-cover transition-transform transform hover:scale-110'
                    onClick={handleShowProductDetail}
                />
            </div>
            <div className='border-dashed border-2 border-slate-400 mb-3'></div>
            <div className='flex flex-col items-center justify-center'>
                <div
                    className='mb-1 font-bold cursor-pointer text-xl tracking-wide mb:text-16'
                    onClick={handleShowProductDetail}
                >
                    {showProduct && showProduct.productName ? showProduct.productName : ''}
                </div>
                <div className='mb-1 font-light text-lg tracking-wider mb:text-16'>
                    {showProduct && showProduct.productStatus ? showProduct.productStatus : ''}
                </div>
                <div className='mb-1 font-semibold text-lg tracking-wider mb:text-16'>
                    ${showProduct && showProduct.price ? showProduct.price : ''}
                </div>
            </div>
        </div>
    )
}

export default ShoeBox
