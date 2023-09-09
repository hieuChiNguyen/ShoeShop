import React from 'react'
import Image from 'next/image'
import assets from '@/assets'
import Link from 'next/link'

function Forum() {
    return (
        <div className='w-[80%] justify-center items-end mx-auto lt:my-10 mb:my-2 mb:w-[96%] mb:mx-auto'>
            <div className='flex flex-row justify-between mx-auto lt:gap-10'>
                <div className='flex flex-col mx-auto lt:gap-6 p-2 mb:gap-1'>
                    <Link href={'/products'}>
                        <div className='cursor-pointer'>
                            <Image
                                src={assets.images.post1}
                                width={600}
                                height={300}
                                alt='All black in black'
                                className='h-80 mb:h-24 mb:w-full'
                            />
                        </div>
                    </Link>
                    <Link href={'/products'}>
                        <div className='uppercase text-2xl font-bold cursor-pointer mb:text-sm mb:w-44'>
                            All black in black
                        </div>
                    </Link>
                    <div className='block lt:w-500 mb:text-12 mb:font-normal mb:w-44'>
                        Although the color black has many applications, it always highlights a mysterious and not boring
                        look.
                    </div>
                </div>

                <div className='flex flex-col lt:gap-6 p-2 mb:gap-2'>
                    <div className='cursor-pointer'>
                        <Image
                            src={assets.images.post2}
                            width={600}
                            height={300}
                            alt='Urbas Corluray Pack'
                            className='h-80 mb:h-24 mb:w-full'
                        />
                    </div>
                    <div className='uppercase text-2xl font-bold cursor-pointer mb:text-sm mb:w-44'>
                        Urbas Corluray Pack
                    </div>
                    <div className='block lt:w-500 mb:text-12 mb:font-normal'>
                        The Urbas Corluray Pack offers the option to "refresh yourself" with a combination of 5 autumn
                        colors; suitable for dynamic young people who want to show their unique personality that is hard
                        to duplicate.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forum
