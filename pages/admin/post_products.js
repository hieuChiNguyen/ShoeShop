'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import assets from '@/assets'
import { emitter } from '@/utils/emitter'
import productApi from '@/app/api/productApi'
import AdminSideBar from '@/app/Components/Admin/AdminSideBar'
import SizeBox from '@/app/Components/Admin/Products/SizeBox'
import SignInPage from '../signin'
import toasts from '@/app/Components/Common/Toast/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

function AdminPostProductPage() {
    const ISSERVER = typeof window === 'undefined'
    // Access localStorage
    const checkRole = !ISSERVER ? sessionStorage.getItem('isAdmin') : false

    return checkRole ? (
        <div className='flex flex-row'>
            <AdminSideBar />
            <PostProducts />
        </div>
    ) : (
        <SignInPage />
    )
}

const PostProducts = () => {
    const [input, setInput] = useState({
        productName: '',
        image: undefined,
        color: '',
        price: '',
        quantity: '',
        description: '',
        totalRate: '',
        category: '',
        productGender: '',
        productCode: ''
    })

    const [sizes, setSizes] = useState([])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeImage = (e) => {
        const fileImage = e.target.files[0]
        setInput({
            ...input,
            image: fileImage
        })
    }

    const handleCheckbox = (e) => {
        const val = e.target.value

        if (e.target.checked) {
            setSizes([...sizes, val])
        } else {
            setSizes([
                ...sizes.filter((size) => {
                    return size !== val
                })
            ])
        }
    }

    useEffect(() => {}, [input])

    const listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // reset state
            setInput({
                productName: '',
                image: undefined,
                size: '',
                color: '',
                price: '',
                quantity: '',
                description: '',
                totalRate: '',
                category: '',
                productGender: '',
                productCode: ''
            })

            setSizes([])
        })
    }

    listenToEmitter()

    const checkValidateInput = () => {
        let isValid = true
        let arrayInput = [
            'productName',
            'image',
            'color',
            'price',
            'quantity',
            'description',
            'category',
            'productGender',
            'productCode'
        ]

        for (let i = 0; i < arrayInput.length; i++) {
            if (!input[arrayInput[i]]) {
                isValid = false
                alert('Missing parameters: ' + arrayInput[i])
                break
            }
        }

        return isValid
    }

    const createNewProduct = async () => {
        try {
            const arraySizes = [...sizes]
            arraySizes.sort()
            const stringSizes = arraySizes.join(',')
            const formData = new FormData()
            formData.append('productName', input.productName)
            formData.append('image', input.image)
            formData.append('size', stringSizes)
            formData.append('color', input.color)
            formData.append('price', input.price)
            formData.append('quantity', input.quantity)
            formData.append('description', input.description)
            formData.append('category', input.category)
            formData.append('productGender', input.productGender)
            formData.append('productCode', input.productCode)

            let response = await productApi.createNewProduct(formData)
            if (response && response.errCode !== 0) {
                toasts.errorTopRight('Failed to create a new product!')
            } else {
                toasts.successTopRight('Create new one successfully !')
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddNewProduct = () => {
        let isValid = checkValidateInput()
        if (isValid === true) {
            createNewProduct(input)
        }
    }

    return (
        <>
            <form method='POST' className='w-3/4 float-right h-fit right-0 mx-auto mt-0'>
                <div className='min-h-screen p-6 bg-gray-100 flex items-center justify-center'>
                    <div className='container max-w-screen-lt mx-auto'>
                        <div>
                            <h2 className='font-semibold text-xl text-gray-600'>Create a new product</h2>
                            <p className='text-gray-500 mb-6'>Fill out information of your new arrival</p>

                            <div className='bg-white rounded shadow-lt p-3 px-4 lt:p-6 mb-6'>
                                <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 lt:grid-cols-3'>
                                    <div className='text-gray-600'>
                                        <p className='font-medium text-lt'>Product Details</p>
                                        <p>Please fill out all the fields.</p>
                                    </div>

                                    <div className='lt:col-span-2'>
                                        <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 lt:grid-cols-5'>
                                            <div className='lt:col-span-3'>
                                                <label>Product Name</label>
                                                <input
                                                    type='text'
                                                    name='productName'
                                                    id='productName'
                                                    className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                                    value={input.productName || ''}
                                                    placeholder='Urbas Corluray Mix'
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className='lt:col-span-2'>
                                                <label>Product Code</label>
                                                <input
                                                    type='text'
                                                    name='productCode'
                                                    id='productCode'
                                                    className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                                    value={input.productCode || ''}
                                                    placeholder='UCM01LT'
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className='lt:col-span-3 mt-2'>
                                                <label>Image</label>
                                                <input
                                                    className='relative m-0 mt-1 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary'
                                                    type='file'
                                                    id='formFile'
                                                    name='image'
                                                    onChange={handleChangeImage}
                                                />
                                            </div>

                                            <div className='lt:col-span-2 mt-2'>
                                                <label>Color</label>
                                                <input
                                                    type='text'
                                                    name='color'
                                                    id='color'
                                                    className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                                    value={input.color || ''}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className='lt:col-span-5 mt-2'>
                                                <label>Description</label>
                                                <input
                                                    type='text'
                                                    name='description'
                                                    id='description'
                                                    className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                                    value={input.description || ''}
                                                    onChange={handleChange}
                                                    placeholder='This is product description'
                                                />
                                            </div>

                                            <div className='lt:col-span-2 mt-2'>
                                                <label>Category</label>
                                                <div className='h-10 w-60 bg-gray-50 flex border border-gray-300 rounded items-center mt-1'>
                                                    <select
                                                        name='category'
                                                        className='cursor-pointer border outline-none h-10 w-60 focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600'
                                                        value={input.category || ''}
                                                        onChange={handleChange}
                                                    >
                                                        <option value='Mule'>Mule</option>
                                                        <option value='Low Top'>Low Top</option>
                                                        <option value='Mid Top'>Mid Top</option>
                                                        <option value='High Top'>High Top</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='lt:col-span-1 mt-2'>
                                                <label>Price</label>
                                                <input
                                                    type='text'
                                                    name='price'
                                                    id='price'
                                                    className='transition-all flex h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                                    placeholder='40'
                                                    value={input.price || ''}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className='lt:col-span-1 mt-2'>
                                                <label>Quantity</label>
                                                <div className='h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
                                                    <input
                                                        name='quantity'
                                                        id='quantity'
                                                        placeholder='0'
                                                        className='px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent'
                                                        value={input.quantity || ''}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className='lt:col-span-1 mt-2'>
                                                <label>Product Gender</label>
                                                <div className='h-10 w-28 bg-gray-50 flex border border-gray-200 rounded mt-1'>
                                                    <select
                                                        name='productGender'
                                                        id='productGender'
                                                        className='cursor-pointer border outline-none h-10 w-60 focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600'
                                                        value={input.productGender || ''}
                                                        onChange={handleChange}
                                                    >
                                                        <option value='Male'>Male</option>
                                                        <option value='Female'>Female</option>
                                                        <option value='Unisex'>Unisex</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='lt:col-span-5 mt-2'>
                                                <label>Size</label>
                                                <div className='h-10 w-full flex flex-row rounded items-center mt-1 gap-6 p-2'>
                                                    <SizeBox label='35' onChange={handleCheckbox} />
                                                    <SizeBox label='36' onChange={handleCheckbox} />
                                                    <SizeBox label='37' onChange={handleCheckbox} />
                                                    <SizeBox label='38' onChange={handleCheckbox} />
                                                    <SizeBox label='39' onChange={handleCheckbox} />
                                                    <SizeBox label='40' onChange={handleCheckbox} />
                                                    <SizeBox label='41' onChange={handleCheckbox} />
                                                    <SizeBox label='42' onChange={handleCheckbox} />
                                                    <SizeBox label='43' onChange={handleCheckbox} />
                                                    <SizeBox label='44' onChange={handleCheckbox} />
                                                </div>
                                            </div>

                                            <div className='lt:col-span-5 text-right mt-5'>
                                                <div className='inline-flex items-end'>
                                                    <button
                                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                                        type='button'
                                                        onClick={handleAddNewProduct}
                                                    >
                                                        Submit to Home
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Image
                            src={assets.images.logo}
                            alt='Buy Me A Coffee'
                            width={100}
                            height={100}
                            className='transition-all rounded-full w-16 -rotate-45 hover:shadow-sm shadow-lt ring hover:ring-4 ring-white'
                        />
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default AdminPostProductPage
