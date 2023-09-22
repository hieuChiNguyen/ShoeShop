import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import { TiDeleteOutline } from 'react-icons/ti'
import Link from 'next/link'
import userApi from '@/app/api/userApi'

function Search() {
    const [searchWord, setSearchWord] = useState('')
    const [searchProducts, setSearchProducts] = useState(null)

    useEffect(() => {
        console.log('check search: ', searchWord)
    }, [searchWord])

    const handleChangeSearchWord = async (e) => {
        setSearchWord(e.target.value)
        try {
            let response = await userApi.search(searchWord)
            console.log('check response search: ', response)
            if (response && response.errCode === 0) {
                setSearchProducts(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // reset input search field's value
    const handleResetSearchInput = () => {
        setSearchWord('')
    }

    return (
        <>
            <div
                className='     
                rounded-md 
                my-auto
                flex
                items-center
                justify-center
                lt:h-3
                lt:w-500
                mb:w-28
                
            '
            >
                <form action='' className=''>
                    <div
                        className={`flex flex-row items-center border-2 border-gray-300 px-2 py-2 rounded-md focus-within:border-sky-300 focus:border-sky-300 focus-within:ring-sky-300 focus-within:shadow-md focus-within:ring-2 lt:w-80 lt:gap-2 mb:border-none `}
                    >
                        <BsSearch size={24} className='cursor-pointer mb:ml-16' />
                        <input
                            id='search'
                            className={`focus:outline-none rounded-md text-lg border-none p-1 mb:hidden mb:text-16 ${
                                searchWord ? 'bg-gray-200' : ''
                            }`}
                            type='text'
                            name='search'
                            placeholder='Search'
                            autoComplete='off'
                            value={searchWord}
                            onChange={(e) => handleChangeSearchWord(e)}
                        />
                        <TiDeleteOutline
                            size={28}
                            className={`${searchWord ? '' : 'hidden'} opacity-50 text-slate-900 cursor-pointer`}
                            onClick={handleResetSearchInput}
                        />
                    </div>
                </form>
                <div className='absolute rounded-xl shadow-md lt:w-300 bg-white overflow-hidden top-24 lt:text-16 z-10 mb:hidden'>
                    <div className='flex flex-col cursor-pointer'>
                        {searchProducts ? (
                            searchProducts.map((searchProduct, index) => {
                                console.log('check searchProduct: ', searchProduct)
                                return (
                                    <Link key={index} href={`/products/${searchProduct.id}`}>
                                        <div key={index} className='px-2 py-2 hover:bg-neutral-200 font-medium'>
                                            {searchProduct.productName}
                                        </div>
                                    </Link>
                                )
                            })
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search
