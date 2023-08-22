import React from 'react'
import { BsSearch } from 'react-icons/bs'

function Search() {
    return (
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
                <div className='flex flex-row items-center border-2 border-gray-300 px-2 py-2 rounded-md focus-within:border-sky-300 focus:border-sky-300 focus-within:ring-sky-300 focus-within:shadow-md focus-within:ring-2 lt:w-80 lt:gap-2 mb:border-none'>
                    <BsSearch size={24} className='cursor-pointer mb:ml-16' />
                    <input
                        id='search'
                        className='focus:outline-none rounded-md text-lg border-none mb:hidden mb:text-16'
                        type='text'
                        name='search'
                        placeholder='Search'
                        autoComplete='off'
                    />
                </div>
            </form>
        </div>
    )
}

export default Search
