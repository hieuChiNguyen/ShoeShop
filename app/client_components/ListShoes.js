'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import assets from '@/assets'
import ShoeBox from './ShoeBox'
import productApi from '@/app/api/productApi'

function ListShoes() {
    const [showProducts, setShowProducts] = useState([])

    useEffect(() => {
        async function fetchData() {
            await showAllProducts()
        }
        fetchData()
    }, [showProducts])

    const showAllProducts = async () => {
        let response = await productApi
            .getProduct('ALL')

            .then((res) => {
                if (res && res.errCode === 0) {
                    setShowProducts(res.data)
                }
            })
    }

    return (
        <div className='w-full justify-center mx-auto'>
            <div className='items-center justify-center mb-20 w-[80%] mx-auto mb:w-full mb:mb-8'>
                <Image alt='Poster Product' src={assets.images.posterProduct} className='w-full h-auto' />
            </div>

            <div className='w-[80%] flex flex-row col-span-3 flex-wrap gap-3 lt:justify-between items-center mx-auto mb-5 mb:w-[90%] mb:col-span-2 mb:gap-5'>
                {showProducts.length > 0 &&
                    showProducts.map((showProduct, index) => <ShoeBox key={index} showProduct={showProduct} />)}
            </div>
        </div>
    )
}

export default ListShoes
