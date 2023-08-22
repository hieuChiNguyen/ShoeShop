'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import assets from '@/assets'
import productApi from '@/app/api/productApi'
import appConfig from '@/utils/appConfig'
import AdminSideBar from '@/app/admin_components/AdminSideBar'
import ModalEditProduct from '@/app/admin_components/Products/ModalEditProduct'
import '@/styles/globals.css'
import '@/styles/products.css'

function ManageProductsPage() {
    return (
        <div className='flex flex-row'>
            <AdminSideBar />
            <ManageProducts />
        </div>
    )
}

function ManageProducts() {
    const router = useRouter()
    const [arrayProducts, setArrayProducts] = useState([])
    const [showModalEditProduct, setShowModalEditProduct] = useState(false)

    const [productEdit, setProductEdit] = useState({
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
        productCode: '',
        productStatus: ''
    })

    const toggle = () => setShowModalEditProduct(!showModalEditProduct)

    const handleChange = (e) => {
        e.preventDefault()
        setProductEdit({
            ...productEdit,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeProductImage = (e) => {
        const fileImage = e.target.files[0]
        setProductEdit({
            ...productEdit,
            image: fileImage
        })
    }

    useEffect(() => {}, [productEdit])

    useEffect(() => {
        async function fetchData() {
            await manageAllProducts()
        }
        fetchData()
    }, [])

    const manageAllProducts = async () => {
        let response = await productApi
            .getProduct('ALL')

            .then((res) => {
                if (res && res.errCode === 0) {
                    setArrayProducts(res.data)
                }
            })
    }

    const handleUpdateProduct = async (product) => {
        try {
            let response = await productApi.updateProduct(product)

            if (response && response.errCode === 0) {
                await manageAllProducts()
                setShowModalEditProduct(false)
            } else {
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditProduct = (product) => {
        toggle()
        setProductEdit({
            id: product.id,
            productName: product.productName,
            image: product.image,
            size: product.size,
            color: product.color,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            totalRate: product.totalRate,
            category: product.category,
            productGender: product.productGender,
            productCode: product.productCode
        })
    }

    const handleDeleteProduct = async (product) => {
        try {
            let response = await productApi.deleteProduct(product.id)
            if (response && response.errCode === 0) {
                await manageAllProducts()
            } else {
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='m-4 w-3/4 float-right right-0 mx-auto mt-0'>
            <div className='w-auto bg-slate-200 p-2'>
                <div className='m-6 text-center items-center justify-center font-medium text-2xl'>
                    Manage Products Information
                    <div>
                        <div className='w-full bg-slate-400 h-1'></div>
                    </div>
                    {showModalEditProduct && (
                        <ModalEditProduct
                            handleEditProduct={handleEditProduct}
                            toggle={toggle}
                            handleUpdateProduct={handleUpdateProduct}
                            productEdit={productEdit}
                            handleChange={handleChange}
                            handleChangeProductImage={handleChangeProductImage}
                        />
                    )}
                </div>
                <div>
                    <table id='products' className='p-2 text-center border-collapse w-full items-center m-auto'>
                        <tbody className='p-2 text-center'>
                            <tr className='pt-3 pb-3 text-center text-white'>
                                <th className='bg-green-600'>Product Name</th>
                                <th className='bg-green-600'>Product Code</th>
                                <th className='bg-green-600'>Image</th>
                                <th className='bg-green-600'>Color</th>
                                <th className='bg-green-600'>Size</th>
                                <th className='bg-green-600'>Price</th>
                                <th className='bg-green-600'>Quantity</th>
                                <th className='bg-green-600'>Product Gender</th>
                                <th className='bg-green-600'>Category</th>
                                <th className='bg-green-600'>Product Status</th>
                                <th className='bg-green-600'>Description</th>
                                <th className='bg-green-600'>Actions</th>
                            </tr>

                            {arrayProducts &&
                                arrayProducts.map((product, index) => {
                                    return (
                                        <tr key={index} className='bg-slate-300 hover:bg-green-400'>
                                            <td>{product.productName}</td>
                                            <td>{product.productCode}</td>
                                            <td>
                                                <Image
                                                    src={`${appConfig.BACKEND_URL}/${product.image}`}
                                                    width={300}
                                                    height={300}
                                                    alt={product.productName}
                                                    className='p-2 my-4 mx-auto items-center justify-center'
                                                />
                                            </td>
                                            <td>{product.color}</td>
                                            <td>{product.size}</td>
                                            <td>{product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.productGender}</td>
                                            <td>{product.category}</td>
                                            <td>{product.productStatus}</td>
                                            <td className='w-500'>{product.description}</td>
                                            <td>
                                                <button
                                                    className='p-2 border rounded-lg m-1 w-20 bg-slate-400 hover:bg-orange-500'
                                                    onClick={() => handleEditProduct(product)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='p-2 border rounded-lg m-1 w-20 bg-slate-400 hover:bg-rose-600'
                                                    onClick={() => handleDeleteProduct(product)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
                <Image
                    src={assets.images.logo}
                    alt='ShoeShopLogo'
                    placeholder='blur'
                    className='cursor-pointer m-4 p-1 transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white'
                    onClick={() => {
                        router.push('/')
                    }}
                />
            </div>
        </div>
    )
}

export default ManageProductsPage
