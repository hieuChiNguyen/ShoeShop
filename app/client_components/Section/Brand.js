'use client'
import React from 'react'
import Image from 'next/image'
import assets from '@/assets'
import Slider from 'react-slick'
import '@/styles/Brand.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function NextArrow(props) {
    const { className, style, onClick } = props
    return <div className={className} onClick={onClick}></div>
}

function PrevArrow(props) {
    const { className, style, onClick } = props
    return <div className={className} onClick={onClick}></div>
}

function Brand() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    return (
        <div className='mt-24 mb-10 w-[80%] mx-auto items-center mb:mt-14'>
            <div className='uppercase mb-9 text-center text-3xl font-bold text-slate-800 mb:text-2xl mb:mb-1'>
                Brands Of ShoeShop
            </div>

            <div className='justify-between items-center p-4'>
                <Slider {...settings}>
                    <div className='items-center p-2 mx-auto'>
                        <div className='mb-3 mb:mb-2'>
                            <Image
                                src={assets.images.ananas}
                                width={200}
                                height={200}
                                alt='Ananas Logo'
                                className='cursor-pointer mx-auto h-32 object-fit mb:h-16'
                            />
                        </div>
                        <div className='font-semibold text-xl text-center cursor-pointer mb:text-lg'>Ananas</div>
                    </div>

                    <div className='items-center p-2 mx-auto'>
                        <div className='cursor-pointer mb-3'>
                            <Image
                                src={assets.images.nike}
                                width={200}
                                height={200}
                                alt='Nike Logo'
                                className='cursor-pointer mx-auto h-32 object-fit mb:h-16'
                            />
                        </div>
                        <div className='font-semibold text-xl text-center cursor-pointer mb:text-lg'>Nike</div>
                    </div>

                    <div className='items-center p-2 mx-auto'>
                        <div className='cursor-pointer mb-3'>
                            <Image
                                src={assets.images.fila}
                                width={200}
                                height={200}
                                alt='Fila Logo'
                                className='cursor-pointer mx-auto h-32 object-fit mb:h-16'
                            />
                        </div>
                        <div className='font-semibold text-xl text-center cursor-pointer mb:text-lg'>Fila</div>
                    </div>

                    <div className='items-center p-2 mx-auto'>
                        <div className='cursor-pointer mb-3'>
                            <Image
                                src={assets.images.adidas}
                                width={200}
                                height={200}
                                alt='Adidas Logo'
                                className='cursor-pointer mx-auto h-32 object-fit mb:h-16'
                            />
                        </div>
                        <div className='font-semibold text-xl text-center cursor-pointer mb:text-lg'>Adidas</div>
                    </div>

                    <div className='items-center p-2 mx-auto'>
                        <div className='cursor-pointer mb-3'>
                            <Image
                                src={assets.images.puma}
                                width={200}
                                height={200}
                                alt='Puma Logo'
                                className='cursor-pointer mx-auto h-32 object-fit mb:h-16'
                            />
                        </div>
                        <div className='font-semibold text-xl text-center cursor-pointer mb:text-lg'>Puma</div>
                    </div>

                    <div className='items-center p-2 mx-auto'>
                        <div className='cursor-pointer mb-3'>
                            <Image
                                src={assets.images.converse}
                                width={200}
                                height={200}
                                alt='Converse Logo'
                                className='cursor-pointer mx-auto h-32 object-fit mb:h-16'
                            />
                        </div>
                        <div className='font-semibold text-xl text-center cursor-pointer mb:text-lg'>Converse</div>
                    </div>

                    <div className='items-center p-2 mx-auto'>
                        <div className='cursor-pointer mb-3'>
                            <Image
                                src={assets.images.bitis}
                                width={200}
                                height={200}
                                alt='Bitis Logo'
                                className='cursor-pointer mx-auto h-32 object-fit mb:h-16'
                            />
                        </div>
                        <div className='font-semibold text-xl text-center cursor-pointer mb:text-lg'>Bitis</div>
                    </div>

                    <div className='items-center p-2 mx-auto'>
                        <div className='cursor-pointer mb-3'>
                            <Image
                                src={assets.images.newBalance}
                                width={200}
                                height={200}
                                alt='New Balance Logo'
                                className='cursor-pointer mx-auto h-32 object-fit mb:h-16'
                            />
                        </div>
                        <div className='font-semibold text-xl text-center cursor-pointer mb:text-lg'>New Balance</div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default Brand
