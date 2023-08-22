import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri'
import assets from '@/assets'

export default function Footer() {
    const [optionIndex, setOptionIndex] = useState(-1)
    const [showFooter, setShowFooter] = useState(false)
    const labels = ['Product', 'About Us', 'Help', 'Contact']
    const productOptions = ['Male', 'FeMale', 'Sale Off']
    const aboutOptions = ['ShoeShop', 'History', 'Recruitment']
    const helpOptions = ['FAQs', 'Security', 'General Policy']
    const contactOptions = ['Hotline', '0123456789']

    const router = useRouter()

    const handleShowFooter = (index) => {
        setOptionIndex(index)
        setShowFooter(!showFooter)
    }

    const handleProductOption = (index) => {
        if (productOptions[index] === 'Male') {
            router.push('/male')
        }
    }

    return (
        <>
            <div className='bottom-0 pb-5 border-t-slate-600 h-80 w-full p-2 bg-slate-300 mt-20 mb:hidden'>
                <div className='flex flex-row items-center gap-48 my-auto mx-10'>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <Image src={assets.images.shoeStore} alt='ShoeShop' width={200} height={200} />
                        </div>
                        <div className='cursor-pointer uppercase font-bold text-center text-white text-xl p-2 bg-orange-500 hover:bg-sky-500'>
                            Find ShoeShop
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='cursor-pointer uppercase font-bold text-center text-xl hover:text-orange-500'>
                            Product
                        </div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>Male</div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            Female
                        </div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            Sale-off
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='cursor-pointer uppercase font-bold text-center text-xl hover:text-orange-500'>
                            About Us
                        </div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            ShoeShop
                        </div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            History
                        </div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            Recruitment
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='cursor-pointer uppercase font-bold text-center text-xl hover:text-orange-500'>
                            Help
                        </div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>FAQs</div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            Security
                        </div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            General Policy
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='uppercase font-bold text-center text-xl'>Social</div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            Facebook
                        </div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            Youtube
                        </div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            Tik Tok
                        </div>
                        <div className='cursor-pointer font-normal text-center text-lg hover:text-orange-500'>
                            Instagram
                        </div>
                    </div>
                </div>
            </div>

            <div className='relative bg-black bg-opacity-70 p-1 w-full lt:hidden tl:hidden'>
                <div
                    className='uppercase w-full my-auto border-b-[1px] h-20'
                    onClick={() => handleShowFooter(labels.indexOf('Product'))}
                >
                    <div
                        className={`flex flex-row  items-center justify-between my-auto py-6 px-6 ${
                            optionIndex === 0 && showFooter ? 'text-orange-500' : 'text-white'
                        }`}
                    >
                        <div className='items-center justify-center font-semibold'>Product</div>
                        <div className='font-light'>
                            {optionIndex === 0 && showFooter ? (
                                <RiArrowDropDownLine size={40} />
                            ) : (
                                <RiArrowDropUpLine size={40} />
                            )}
                        </div>
                    </div>
                </div>
                {optionIndex === 0 && showFooter && (
                    <div className='flex flex-col gap-5 h-40 w-full tracking-wider text-white font-medium text-16 py-6 px-6'>
                        {productOptions.map((productOption, index) => (
                            <div
                                key={index}
                                className='hover:text-orange-500'
                                onClick={() => handleProductOption(index)}
                            >
                                {productOption}
                            </div>
                        ))}
                    </div>
                )}

                <div
                    className='uppercase w-full my-auto border-b-[1px] h-20'
                    onClick={() => handleShowFooter(labels.indexOf('About Us'))}
                >
                    <div
                        className={`flex flex-row  items-center justify-between my-auto py-6 px-6 ${
                            optionIndex === 1 && showFooter ? 'text-orange-500' : 'text-white'
                        }`}
                    >
                        <div className='items-center justify-center font-semibold'>About Us</div>
                        <div className='font-light'>
                            {optionIndex === 1 && showFooter ? (
                                <RiArrowDropDownLine size={40} />
                            ) : (
                                <RiArrowDropUpLine size={40} />
                            )}
                        </div>
                    </div>
                </div>
                {optionIndex === 1 && showFooter && (
                    <div className='flex flex-col gap-5 h-40 w-full tracking-wider text-white font-medium text-16 py-6 px-6'>
                        {aboutOptions.map((aboutOption, index) => (
                            <div key={index} className='hover:text-orange-500'>
                                {aboutOption}
                            </div>
                        ))}
                    </div>
                )}

                <div
                    className='uppercase w-full my-auto border-b-[1px] h-20'
                    onClick={() => handleShowFooter(labels.indexOf('Help'))}
                >
                    <div
                        className={`flex flex-row  items-center justify-between my-auto py-6 px-6 ${
                            optionIndex === 2 && showFooter ? 'text-orange-500' : 'text-white'
                        }`}
                    >
                        <div className='items-center justify-center font-semibold'>Help</div>
                        <div className='font-light'>
                            {optionIndex === 2 && showFooter ? (
                                <RiArrowDropDownLine size={40} />
                            ) : (
                                <RiArrowDropUpLine size={40} />
                            )}
                        </div>
                    </div>
                </div>
                {optionIndex === 2 && showFooter && (
                    <div className='flex flex-col gap-5 h-40 w-full tracking-wider text-white font-medium text-16 py-6 px-6'>
                        {helpOptions.map((helpOption, index) => (
                            <div key={index} className='hover:text-orange-500'>
                                {helpOption}
                            </div>
                        ))}
                    </div>
                )}

                <div
                    className='uppercase w-full my-auto border-b-[1px] h-20'
                    onClick={() => handleShowFooter(labels.indexOf('Contact'))}
                >
                    <div
                        className={`flex flex-row  items-center justify-between my-auto py-6 px-6 ${
                            optionIndex === 3 && showFooter ? 'text-orange-500' : 'text-white'
                        }`}
                    >
                        <div className='items-center justify-center font-semibold'>Contact</div>
                        <div className='font-light'>
                            {optionIndex === 3 && showFooter ? (
                                <RiArrowDropDownLine size={40} />
                            ) : (
                                <RiArrowDropUpLine size={40} />
                            )}
                        </div>
                    </div>
                </div>
                {optionIndex === 3 && showFooter && (
                    <div className='flex flex-col gap-5 h-40 w-full tracking-wider text-white font-medium text-16 py-6 px-6'>
                        {contactOptions.map((contactOption, index) => (
                            <div key={index} className='hover:text-orange-500'>
                                {contactOption}
                            </div>
                        ))}
                    </div>
                )}

                <div className='uppercase text-white font-semibold text-16 mt-10 mb-5 px-6'>ShoeShop Social</div>
                <div className='flex flex-row gap-5 px-6 mt-2 text-gray-400 text-5xl'>
                    <div>
                        <i className='fa-brands fa-square-facebook'></i>
                    </div>
                    <div className=''>
                        <i className='fa-brands fa-square-instagram'></i>
                    </div>
                    <div>
                        <i className='fa-brands fa-youtube'></i>
                    </div>
                </div>
                <div className='uppercase bg-orange-500 text-white w-[80%] h-16 mx-auto mt-8 mb-10 rounded-xl'>
                    <div className='text-center items-center font-semibold text-lg py-5'>Find ShoeShop</div>
                </div>
            </div>
        </>
    )
}
