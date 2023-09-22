'use client'
import React from 'react'

const ModalEditProduct = ({ toggle, handleUpdateProduct, handleChange, productEdit, handleChangeProductImage }) => {
    const checkValidateProductEdit = () => {
        let isValid = true
        let arrayInput = [
            'productName',
            'image',
            'size',
            'color',
            'price',
            'quantity',
            'description',
            'category',
            'productGender',
            'productCode'
        ]

        for (let i = 0; i < arrayInput.length; i++) {
            if (!productEdit[arrayInput[i]]) {
                isValid = false
                alert('Missing parameters: ' + arrayInput[i])
                break
            }
        }

        return isValid
    }

    const updateProduct = () => {
        let isValid = checkValidateProductEdit()
        if (isValid === true) {
            // Call api
            handleUpdateProduct(productEdit)
        }
    }

    return (
        <div className='bg-white rounded shadow-lg p-3 px-4 md:p-6 mt-10 mb-10 w-[80%] mx-auto'>
            <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3'>
                <div className='text-gray-600'>
                    <p className='font-medium text-xl'>Edit Product Information</p>
                </div>

                <div className='lg:col-span-2'>
                    <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5'>
                        <div className='md:col-span-2'>
                            <label className='flex'>Product Name</label>
                            <input
                                type='text'
                                name='productName'
                                id='productName'
                                className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                value={productEdit.productName || ''}
                                placeholder='Urbas Corluray Mix'
                                onChange={handleChange}
                            />
                        </div>

                        <div className='md:col-span-2'>
                            <label className='flex'>Product Code</label>
                            <input
                                type='text'
                                name='productCode'
                                id='productCode'
                                className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                value={productEdit.productCode || ''}
                                placeholder='UCM01LT'
                                onChange={handleChange}
                            />
                        </div>

                        {/* <div className='md:col-span-3'>
                            <label className='flex'>Image</label>
                            <input
                                className='relative m-0 mt-1 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary'
                                type='file'
                                id='formFile'
                                name='image'
                                onChange={handleChangeProductImage}
                                disabled
                            />
                        </div> */}

                        <div className='md:col-span-1'>
                            <label className='flex'>Color</label>
                            <input
                                type='text'
                                name='color'
                                id='color'
                                className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                value={productEdit.color || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='md:col-span-5'>
                            <label className='flex'>Description</label>
                            <input
                                type='text'
                                name='description'
                                id='description'
                                className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                value={productEdit.description || ''}
                                onChange={handleChange}
                                placeholder='This is product description'
                            />
                        </div>

                        <div className='md:col-span-2'>
                            <label className='flex'>Category</label>
                            <div className='h-10 w-60 bg-gray-50 flex border border-gray-300 rounded items-center mt-1'>
                                <select
                                    name='category'
                                    className='cursor-pointer border outline-none h-10 w-60 focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600'
                                    value={productEdit.category || ''}
                                    onChange={handleChange}
                                    placeholder='Category'
                                >
                                    <option value='Mule'>Mule</option>
                                    <option value='Low Top'>Low Top</option>
                                    <option value='Mid Top'>Mid Top</option>
                                    <option value='High Top'>High Top</option>
                                </select>
                            </div>
                        </div>

                        <div className='md:col-span-2'>
                            <label className='flex'>Size</label>
                            <div className='h-10 w-60 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
                                <select
                                    name='size'
                                    className='cursor-pointer border outline-none h-10 w-60 focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600'
                                    value={productEdit.size || ''}
                                    onChange={handleChange}
                                >
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
                        </div>

                        <div className='md:col-span-1'>
                            <label className='flex'>Price</label>
                            <input
                                type='text'
                                name='price'
                                id='price'
                                className='transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50'
                                placeholder='40'
                                value={productEdit.price || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='md:col-span-1'>
                            <label className='flex'>How much shoes?</label>
                            <div className='h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
                                <input
                                    name='quantity'
                                    id='quantity'
                                    placeholder='0'
                                    className='px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent'
                                    value={productEdit.quantity || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='md:col-span-1'>
                            <label className='flex'>How gender?</label>
                            <div className='h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
                                <input
                                    name='productGender'
                                    id='productGender'
                                    className='px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent'
                                    value={productEdit.productGender}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='md:col-span-5 text-right'>
                            <div className='inline-flex items-end'>
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5'
                                    type='button'
                                    onClick={updateProduct}
                                >
                                    Submit to Home
                                </button>
                                <button
                                    className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    type='button'
                                    onClick={toggle}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditProduct
