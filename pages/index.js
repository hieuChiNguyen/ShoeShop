import React from 'react'
import Image from 'next/image'
import assets from '@/assets'
import Wrapper from '@/app/client_components/Layout/Wrapper'
import Layout from '@/app/client_components/Layout/Layout'
import Forum from '@/app/client_components/Section/Forum'
import Brand from '@/app/client_components/Section/Brand'
import Typical from '@/app/client_components/Section/Typical'
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
