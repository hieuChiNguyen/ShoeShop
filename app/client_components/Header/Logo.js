'use client'
import Image from 'next/image'
import assets from '@/assets'
import Link from 'next/link'

function Logo() {
    return (
        <Link href={'/'}>
            <Image
                alt='Logo'
                height='100'
                width='100'
                src={assets.images.logo}
                priority={true}
                className='
                tl:block 
                lt:block 
                cursor-pointer 
                rounded-full
                mb:my-1 
                mb:mx-1 
                tl:my-1
                tl:mx-3
                lt:my-3
                lt:mx-4
            '
            />
        </Link>
    )
}

export default Logo
