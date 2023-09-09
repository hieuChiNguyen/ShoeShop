'use client'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri'
import { BiSolidCheckCircle } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import appConfig from '@/utils/appConfig'
import assets from '@/assets'
import Wrapper from '@/app/client_components/Layout/Wrapper'
import Layout from '@/app/client_components/Layout/Layout'
import productApi from '@/app/api/productApi'
import cartApi from '@/app/api/cartApi'
import '@/styles/globals.css'

function ProductDetailPage() {
    const router = useRouter()
    const productId = router.query.productId
    const [product, setProduct] = useState({})

    useEffect(() => {
        async function fetchData() {
            await showProductDetail()
        }
        fetchData()
    }, [productId])

    const showProductDetail = async () => {
        try {
            let response = await productApi.getProduct(productId)

            if (response && response.errCode === 0) {
                const productData = response.data
                console.log('productData: ', productData)
                setProduct({
                    ...productData
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Wrapper>
            <Layout>
                <DetailProduct product={product} />
            </Layout>
        </Wrapper>
    )
}

function DetailProduct({ product }) {
    const authState = useSelector((state) => state.auth)
    const [showInformation, setShowInformation] = useState(false)
    const [showPolicy, setShowPolicy] = useState(false)

    const newCart = {
        userId: authState.id,
        productId: product.id,
        countUniqueProduct: 0,
        size: ''
    }

    const handleShowInformation = () => {
        setShowInformation(!showInformation)
    }

    const handleShowPolicy = () => {
        setShowPolicy(!showPolicy)
    }

    const handleAddProductToCart = async () => {
        try {
            if (newCart.userId && newCart.size === '') {
                toast.error('Fill out size of shoe !', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light'
                })
            } else if (newCart.userId && newCart.countUniqueProduct === 0) {
                toast.error('Fill out count of shoe !', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light'
                })
            } else {
                let response = await cartApi.addToCart(newCart).then((res) => {
                    console.log('check res: ', res)

                    if (res && res.errCode !== 0) {
                        toast.error('Add product to cart failed !', {
                            position: 'top-right',
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light'
                        })
                    }
                    if (res && res.errCode === 0) {
                        toast.success('Add product to cart successfully !', {
                            position: 'top-right',
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light'
                        })
                    }
                })
            }
        } catch (error) {
            toast.error('You must sign in to add product to cart !', {
                position: 'top-right',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })

            console.log(error)
        }
    }

    const handleChooseSize = (e) => {
        newCart[e.target.name] = e.target.value
    }

    const handleChooseCount = (e) => {
        newCart[e.target.name] = parseInt(e.target.value)
    }

    return (
        <div className='w-[80%] justify-center mx-auto mt-10 mb-10'>
            <div className='flex flex-row'>
                <div className='border-r-gray-400 border-r-2 h-6 my-2 px-3 text-center items-center'>
                    {product.category}
                </div>
                <div className='font-bold my-2 text-center px-3'>{product.productName}</div>
            </div>
            <div className='border-2 border-solid border-slate-800 w-full mb-10'></div>

            <div className='flex flex-row gap-16'>
                <div className='flex flex-col gap-10'>
                    <div>
                        <Image
                            src={product?.image ? `${appConfig.BACKEND_URL}/${product.image}` : assets.images.sample}
                            alt={product?.productName ? product.productName : ''}
                            className='h-600 w-600'
                            width={600}
                            height={600}
                            priority={true}
                        />
                    </div>
                    <div className='w-600 font-medium text-16 leading-8'>{product.description}</div>
                </div>

                <div className='flex flex-col'>
                    <div className='uppercase font-bold text-3xl mb-10'>{product.productName}</div>
                    <div className='font-normal text-lg mb-10'>{product.productStatus}</div>
                    <div className='font-normal text-lg mb-10 italic'>Color: {product.color}</div>
                    <div className='text-orange-600 font-semibold text-2xl mb-10'>Price: {product.price}$</div>
                    <div className='flex flex-row items-center justify-center gap-20 w-full mb-10'>
                        <div className='flex flex-col'>
                            <label className='text-lg'>SIZE</label>
                            <select
                                name='size'
                                id='size'
                                className='border-[1px] w-60 h-10 border-slate-600 text-16 text-gray-800 hover:text-blue-600'
                                onChange={handleChooseSize}
                            >
                                <option value='null' hidden></option>
                                <option value='35'>35</option>
                                <option value='36'>36</option>
                                <option value='37'>37</option>
                                <option value='38'>38</option>
                                <option value='39'>39</option>
                                <option value='40'>40</option>
                                <option value='41'>41</option>
                                <option value='42'>42</option>
                                <option value='43'>43</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-lg'>COUNT</label>
                            <select
                                name='countUniqueProduct'
                                id='countUniqueProduct'
                                className='border-[1px] w-60 h-10 border-slate-600 text-gray-800 hover:text-blue-600'
                                onChange={handleChooseCount}
                            >
                                <option value='null' hidden></option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                            </select>
                        </div>
                    </div>

                    <div
                        className='uppercase cursor-pointer w-full h-16 bg-slate-600 hover:bg-slate-500 text-white text-center font-bold text-2xl py-4 mb-10 '
                        onClick={handleAddProductToCart}
                    >
                        Add to cart
                    </div>

                    <div className='uppercase cursor-pointer w-full h-16 bg-orange-600 text-white text-center font-bold text-2xl py-4 mb-10'>
                        Payment
                    </div>

                    <div className='flex flex-row cursor-pointer' onClick={handleShowInformation}>
                        <div
                            className={`uppercase font-bold text-xl py-4 mb-5 
                                    ${showInformation ? 'text-orange-600' : ''}`}
                        >
                            Product Information
                        </div>
                        <div className='items-center py-4'>
                            {showInformation ? (
                                <RiArrowDropUpLine size={32} className='text-orange-600' />
                            ) : (
                                <RiArrowDropDownLine size={32} />
                            )}
                        </div>
                    </div>

                    {showInformation ? (
                        <div className='mb-10'>
                            <div>Gender: {product.productGender}</div>
                            <div>
                                <Image src={assets.images.sizeBoard} alt='SizeBoard' className='w-auto' />
                            </div>
                        </div>
                    ) : null}

                    <div className='flex flex-row cursor-pointer' onClick={handleShowPolicy}>
                        <div
                            className={`uppercase font-bold text-xl py-4 mb-5 
                                ${showPolicy ? 'text-orange-600' : ''}`}
                        >
                            Product exchange policy
                        </div>
                        <div className='items-center py-4'>
                            {showPolicy ? (
                                <RiArrowDropUpLine size={32} className='text-orange-600' />
                            ) : (
                                <RiArrowDropDownLine size={32} />
                            )}
                        </div>
                    </div>

                    {showPolicy ? (
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row gap-2'>
                                <BiSolidCheckCircle size={18} />
                                <div>Exchange only 1 time, please consider carefully before deciding.</div>
                            </div>

                            <div className='flex flex-row gap-2'>
                                <BiSolidCheckCircle size={18} />
                                <div>Exchange only 1 time, please consider carefully before deciding.</div>
                            </div>

                            <div className='flex flex-row gap-2'>
                                <BiSolidCheckCircle size={18} />
                                <div>The exchanged product has no signs of being used, not washed, or deformed.</div>
                            </div>

                            <div className='flex flex-row gap-2'>
                                <BiSolidCheckCircle size={18} />
                                <div>No cash refund under any circumstances. Wish you sympathize.</div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <ToastContainer
                position='top-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </div>
    )
}

export default ProductDetailPage
