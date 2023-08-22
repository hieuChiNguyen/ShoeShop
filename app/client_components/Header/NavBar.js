'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation, Autoplay } from 'swiper/modules'

import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Profile from './Profile'
import 'swiper/css'
import 'swiper/css/navigation'
import '@/styles/NavBar.css'
import Image from 'next/image'
import assets from '@/assets'

function NavBar() {
    const router = useRouter()

    const discounts = [
        'EXCHANGE WITHIN 2 WEEKS',
        'SHOES HALF A YEAR WARRANTY',
        'FREE SHIPPING WITH BILL FROM 800K!',
        'PLEASE CLICK HELP FOR MORE INFORMATION'
    ]

    const [showModalUserMenu, setShowModalUserMenu] = useState(false)
    const authState = useSelector((state) => state.auth)

    const openModalUserMenu = () => {
        setShowModalUserMenu(true)
    }

    const closeModalUserMenu = () => {
        setShowModalUserMenu(false)
    }

    useEffect(() => {}, [authState])

    return (
        <>
            <div className='flex flex-row gap-2 md:gap-3 lg:gap-3 float-left w-full z-10 bg-slate-50 sticky top-0'>
                <Logo />
                <UserMenu openModalUserMenu={openModalUserMenu} closeModalUserMenu={closeModalUserMenu} />
                <Search />
                {/* <div className='flex flex-row my-auto mr-6'>
                    <div className='border-r-2 px-2 border-slate-400 cursor-pointer hover:text-orange-600 hover:underline'>
                        VI
                    </div>
                    <div className='px-2 cursor-pointer hover:text-orange-600 hover:underline'>EN</div>
                </div> */}
                <div className='flex my-auto mr-8 mb:mr-2'>
                    <i className='fa-light fa-globe cursor-pointer text-orange-600 hover:text-orange-400 text-3xl font-medium lt:block mb:text-2xl '></i>
                </div>
                <div
                    className='inline-block my-auto items-center justify-center lt:mr-20 lt:ml-4 mb:mr-1'
                    onClick={() => router.push('/cart')}
                >
                    <i className='fa-sharp fa-light fa-cart-shopping-fast cursor-pointer text-orange-600 hover:text-orange-400 text-3xl font-medium lt:block mb:text-2xl'></i>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='inline-block my-auto items-center justify-center'>
                        <Profile />
                    </div>
                    <div
                        className={`text-left absolute bottom-2 p-1 font-semibold mb:hidden ${
                            authState.loggedIn ? '' : 'hidden'
                        }`}
                    >
                        Welcome {authState.username}
                    </div>
                </div>
            </div>
            {showModalUserMenu && (
                <div
                    className='flex flex-row h-96 w-full bg-gray-700 z-50 transition-all p-10 sticky top-[124px] '
                    onMouseOver={openModalUserMenu}
                    onMouseLeave={closeModalUserMenu}
                >
                    <div className='flex flex-col gap-6 items-center mx-auto'>
                        <Image
                            alt='male'
                            src={assets.images.male}
                            height={300}
                            width={300}
                            className='h-64 w-64 cursor-pointer hover:transition-all hover:ease-linear opacity-60 hover:opacity-100 hover:contrast-125'
                            onClick={() => router.push('/male')}
                        />
                        <div className='uppercase text-white font-semibold text-lg cursor-pointer tracking-widest hover:text-orange-600'>
                            For male
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 items-center mx-auto '>
                        <Image
                            alt='female'
                            src={assets.images.female}
                            height={300}
                            width={300}
                            className='h-64 w-64 cursor-pointer hover:transition-all hover:ease-linear opacity-60 hover:opacity-100 hover:contrast-125'
                            onClick={() => router.push('/female')}
                        />
                        <div className='uppercase text-white font-semibold text-lg cursor-pointer tracking-widest hover:text-orange-600'>
                            For female
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 items-center mx-auto'>
                        <Image
                            alt='saleoff'
                            src={assets.images.saleOff}
                            height={300}
                            width={300}
                            className='h-64 w-64 cursor-pointer hover:transition-all hover:ease-linear opacity-60 hover:opacity-100 hover:contrast-125'
                            onClick={() => router.push('/saleOff')}
                        />
                        <div className='uppercase text-white font-semibold text-lg cursor-pointer tracking-widest hover:text-orange-600'>
                            Sale off
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 items-center mx-auto'>
                        <Image
                            alt='help'
                            src={assets.images.help}
                            height={300}
                            width={300}
                            className='h-64 w-64 cursor-pointer hover:transition-all hover:ease-linear opacity-60 hover:opacity-100 hover:contrast-125'
                            onClick={() => router.push('/help')}
                        />
                        <div className='uppercase text-white font-semibold text-lg cursor-pointer tracking-widest hover:text-orange-600'>
                            Help
                        </div>
                    </div>
                </div>
            )}
            {!showModalUserMenu && (
                <div className='flex overflow-hidden relative my-auto text-center text-10 lt:text-lg w-full bg-gray-200 lt:h-16 mb:h-10'>
                    <div className='items-center mx-auto h-16 justify-center w-[40%] py-3 mb:w-[80%]'>
                        <Swiper
                            navigation={true}
                            loop={true}
                            modules={[Navigation, Autoplay]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
                            }}
                        >
                            {discounts.map((discount, index) => (
                                <SwiperSlide
                                    key={index}
                                    className='p-1 mx-auto font-medium tracking-wide text-16 mb:text-10 mb:tracking-normal'
                                >
                                    <Link href={`/help`}>{discount}</Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </>
    )
}

export default NavBar
