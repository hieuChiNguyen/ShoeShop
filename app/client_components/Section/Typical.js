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

function Typical() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    return (
        <div className='mt-24 mb-10 w-[80%] mx-auto items-center mb:mt-14'>
            <div className='uppercase mb-9 text-center text-3xl font-bold text-slate-800 mb:text-2xl mb:mb-0'>
                Bestsellers of ShoeShop
            </div>

            <div className='justify-between items-center p-4'>
                <Slider {...settings}>
                    <div className='items-center p-2 mx-auto mb:w-40'>
                        <div className='mb-3 mb:mb-1'>
                            <Image
                                src={assets.images.ShoeSample}
                                width={200}
                                height={200}
                                alt='Ananas Logo'
                                className='cursor-pointer mx-auto h-40 w-40 object-fit mb:h-60 mb:w-60'
                            />
                        </div>
                        <div className='mx-auto font-semibold text-xl text-center cursor-pointer mb:w-60'>
                            Sample Shoe
                        </div>
                    </div>

                    <div className='items-center p-2 mx-auto mb:w-40'>
                        <div className='mb-3 mb:mb-1'>
                            <Image
                                src={assets.images.ShoeSample}
                                width={200}
                                height={200}
                                alt='Ananas Logo'
                                className='cursor-pointer mx-auto h-40 w-40 object-fit mb:h-60 mb:w-60'
                            />
                        </div>
                        <div className='mx-auto font-semibold text-xl text-center cursor-pointer mb:w-60'>
                            Sample Shoe
                        </div>
                    </div>

                    <div className='items-center p-2 mx-auto mb:w-40'>
                        <div className='mb-3 mb:mb-1'>
                            <Image
                                src={assets.images.ShoeSample}
                                width={200}
                                height={200}
                                alt='Ananas Logo'
                                className='cursor-pointer mx-auto h-40 w-40 object-fit mb:h-60 mb:w-60'
                            />
                        </div>
                        <div className='mx-auto font-semibold text-xl text-center cursor-pointer mb:w-60'>
                            Sample Shoe
                        </div>
                    </div>

                    <div className='items-center p-2 mx-auto mb:w-40'>
                        <div className='mb-3 mb:mb-1'>
                            <Image
                                src={assets.images.ShoeSample}
                                width={200}
                                height={200}
                                alt='Ananas Logo'
                                className='cursor-pointer mx-auto h-40 w-40 object-fit mb:h-60 mb:w-60'
                            />
                        </div>
                        <div className='mx-auto font-semibold text-xl text-center cursor-pointer mb:w-60'>
                            Sample Shoe
                        </div>
                    </div>

                    <div className='items-center p-2 mx-auto mb:w-40'>
                        <div className='mb-3 mb:mb-1'>
                            <Image
                                src={assets.images.ShoeSample}
                                width={200}
                                height={200}
                                alt='Ananas Logo'
                                className='cursor-pointer mx-auto h-40 w-40 object-fit mb:h-60 mb:w-60'
                            />
                        </div>
                        <div className='mx-auto font-semibold text-xl text-center cursor-pointer mb:w-60'>
                            Sample Shoe
                        </div>
                    </div>

                    <div className='items-center p-2 mx-auto mb:w-40'>
                        <div className='mb-3 mb:mb-1'>
                            <Image
                                src={assets.images.ShoeSample}
                                width={200}
                                height={200}
                                alt='Ananas Logo'
                                className='cursor-pointer mx-auto h-40 w-40 object-fit mb:h-60 mb:w-60'
                            />
                        </div>
                        <div className='mx-auto font-semibold text-xl text-center cursor-pointer mb:w-60'>
                            Sample Shoe
                        </div>
                    </div>

                    <div className='items-center p-2 mx-auto mb:w-40'>
                        <div className='mb-3 mb:mb-1'>
                            <Image
                                src={assets.images.ShoeSample}
                                width={200}
                                height={200}
                                alt='Ananas Logo'
                                className='cursor-pointer mx-auto h-40 w-40 object-fit mb:h-60 mb:w-60'
                            />
                        </div>
                        <div className='mx-auto font-semibold text-xl text-center cursor-pointer mb:w-60'>
                            Sample Shoe
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default Typical
