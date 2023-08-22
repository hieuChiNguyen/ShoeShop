import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import appConfig from '@/utils/appConfig'
import cartApi from '@/app/api/cartApi'
import Wrapper from '@/app/client_components/Layout/Wrapper'
import Layout from '@/app/client_components/Layout/Layout'
import assets from '@/assets'
import '@/styles/globals.css'

function CartPage() {
    return (
        <Wrapper>
            <Layout>
                <Cart />
            </Layout>
        </Wrapper>
    )
}

function Cart() {
    const router = useRouter()
    const [cart, setCart] = useState([])
    const [totalItems, setTotalItems] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)
    const authState = useSelector((state) => state.auth)

    useEffect(() => {
        async function fetchData() {
            await showProductDetail()
        }
        fetchData()
    }, [totalPrice])

    const showProductDetail = async () => {
        try {
            let response = await cartApi.getCart(authState.id).then((res) => {
                if (res && res.errCode === 0) {
                    setTotalItems(res.countItems)
                    setCart(res.products)
                }
                const sum = cart.reduce((price, product) => price + product.price * product.countUniqueProduct, 0)
                setTotalPrice(sum)
                console.log('check cart: ', cart)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveProductCart = async (cartId) => {
        try {
            let response = await cartApi.deleteProductInCart(cartId)
            if (response && response.errCode === 0) {
                await showProductDetail()
                const sum = cart.reduce(
                    (price, product) => price - product.price * product.countUniqueProduct,
                    totalPrice
                )
                setTotalPrice(sum)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container mx-auto mt-10 w-[90%]'>
            {cart && (
                <div className='flex shadow-md my-10'>
                    <div className='w-3/4 bg-white px-10 py-10'>
                        <div className='flex justify-between pb-8'>
                            <h1 className='font-semibold text-2xl'>My Cart</h1>
                            <h2 className='font-semibold text-2xl'>{totalItems ? totalItems : 0} Items</h2>
                        </div>
                        <div className='flex mt-10 mb-5'>
                            <h3 className='font-semibold text-gray-600 text-xl uppercase w-2/5'>Product Details</h3>
                            <h3 className='font-semibold text-center text-gray-600 text-sm uppercase w-1/5'>Size</h3>
                            <h3 className='font-semibold text-center text-gray-600 text-sm uppercase w-1/5'>
                                Quantity
                            </h3>
                            <h3 className='font-semibold text-center text-gray-600 text-sm uppercase w-1/5'>Price</h3>
                        </div>
                        {cart.map((product, index) => {
                            return (
                                <div key={index} className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
                                    <div className='flex w-2/5'>
                                        <div className='w-28'>
                                            <Image
                                                src={
                                                    product?.image
                                                        ? `${appConfig.BACKEND_URL}/${product.image}`
                                                        : assets.images.sample
                                                }
                                                alt={product?.productName ? product.productName : ''}
                                                className='h-24 w-24'
                                                width={100}
                                                height={100}
                                                priority={true}
                                            />
                                        </div>
                                        <div className='flex flex-col justify-between ml-4 flex-grow'>
                                            <span className='font-bold text-16'>
                                                {product?.productName ? product.productName : ''}
                                            </span>
                                            <span className='text-red-500 text-16'>
                                                {product?.category ? product.category : ''}
                                            </span>
                                            <span className='font-semibold text-16'>
                                                {product?.productGender ? product.productGender : ''}
                                            </span>
                                        </div>
                                    </div>

                                    <span className='text-center w-1/5 font-semibold text-sm ml-4'>
                                        {product?.sizeOrder ? product.sizeOrder : ''}
                                    </span>
                                    <div className='flex justify-center w-1/5 pl-2'>
                                        <svg className='fill-current text-gray-600 w-3' viewBox='0 0 448 512'>
                                            <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
                                        </svg>

                                        <div className='mx-2 border text-center w-8'>
                                            {product?.countUniqueProduct ? product.countUniqueProduct : ''}
                                        </div>

                                        <svg className='fill-current text-gray-600 w-3' viewBox='0 0 448 512'>
                                            <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
                                        </svg>
                                    </div>
                                    <span className='text-center w-1/5 font-semibold text-sm pl-4'>
                                        $
                                        {product?.price && product?.countUniqueProduct
                                            ? product.price * product.countUniqueProduct
                                            : ''}
                                    </span>
                                    <div className='flex'>
                                        <button
                                            className='font-semibold hover:text-red-500 text-gray-500 text-16'
                                            onClick={() => handleRemoveProductCart(product.cartId)}
                                        >
                                            <i className='fa-light fa-trash-can text-lg font-semibold'></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}

                        <button
                            className='flex font-semibold text-indigo-600 text-sm mt-10'
                            onClick={() => router.push('/products')}
                        >
                            <svg className='fill-current mr-2 text-indigo-600 w-4' viewBox='0 0 448 512'>
                                <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
                            </svg>
                            Continue Shopping
                        </button>
                    </div>

                    <div id='summary' className='w-1/4 px-8 py-10 bg-slate-200'>
                        <h1 className='font-semibold text-2xl border-b pb-8'>Order Summary</h1>
                        <div className='flex justify-between mt-10 mb-5'>
                            <span className='font-semibold text-sm uppercase'>
                                Items {totalItems ? totalItems : ''}
                            </span>
                            <span className='font-semibold text-sm'>${totalPrice ? totalPrice : 0}</span>
                        </div>
                        <div className='py-10'>
                            <label htmlFor='promo' className='font-semibold inline-block mb-3 text-sm uppercase'>
                                Voucher Code
                            </label>
                            <input
                                type='text'
                                id='promo'
                                placeholder='Enter your code'
                                className='p-2 text-sm w-full'
                            />
                        </div>
                        <button className='bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase'>
                            Apply
                        </button>
                        <div className='border-t mt-8'>
                            <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
                                <span>Total cost</span>
                                <span>${totalPrice ? totalPrice : 0}</span>
                            </div>
                            <button className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'>
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage
