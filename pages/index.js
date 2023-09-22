import React from 'react'
import Image from 'next/image'
import assets from '@/assets'
import Wrapper from '@/app/Components/Client/Layout/Wrapper'
import Layout from '@/app/Components/Client/Layout/Layout'
import Forum from '@/app/Components/Client/Section/Forum'
import Brand from '@/app/Components/Client/Section/Brand'
import Typical from '@/app/Components/Client/Section/Typical'
import '@/styles/globals.css'

function HomePage() {
    return (
        <Wrapper>
            <Layout>
                <Poster />
                <Home />
            </Layout>
        </Wrapper>
    )
}

function Poster() {
    return (
        <div className='sm:w-screen justify-center mx-auto'>
            <div className='items-center justify-center mb-20 mb:mb-4'>
                <Image alt='poster' src={assets.images.poster} className='w-full h-auto' />
            </div>
        </div>
    )
}

function Home() {
    return (
        <>
            <Forum />
            <Brand />
            <Typical />
        </>
    )
}

export default HomePage
