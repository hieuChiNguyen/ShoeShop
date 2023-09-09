'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import assets from '@/assets'
import convertImage from '@/utils/convertImage'
import Wrapper from '@/app/client_components/Layout/Wrapper'
import Layout from '@/app/client_components/Layout/Layout'
import userApi from '@/app/api/userApi'
import '@/styles/globals.css'

function ProfilePage() {
    return (
        <Wrapper>
            <Layout>
                <ProfileDetail />
            </Layout>
        </Wrapper>
    )
}

function ProfileDetail() {
    const authState = useSelector((state) => state.auth)
    const [profile, setProfile] = useState(null)
    const [showAvatar, setShowAvatar] = useState(null)
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        const getProfile = async () => {
            let response = await userApi.getUserProfile(authState.id).then((res) => {
                if (res && res.errCode === 0) {
                    setProfile(res.data)
                    let base64Image = Buffer.from(res.data.avatar, 'base64').toString()
                    console.log('check base64Image line 42', base64Image)
                    setAvatar(base64Image)
                }
            })
        }

        getProfile()
    }, [])

    const handleShowUpdateAvatar = async (e) => {
        let avatarImage = e.target.files[0]
        if (avatarImage) {
            let base64 = await convertImage(avatarImage)
            let objectUrl = URL.createObjectURL(avatarImage)
            setShowAvatar(objectUrl)
            setProfile({ ...profile, avatar: base64 })
            console.log('check base64: ', base64)
            console.log('check line 56: ', profile.avatar)
        }
    }

    const handleGetAvatar = async () => {
        let updateResponse = await userApi.updateAvatarImage(profile)

        let response = await userApi.getUserProfile(authState.id).then((res) => {
            if (res && res.errCode === 0) {
                console.log('check res.data.avatar line 69: ', res.data.avatar)
                let base64Image = Buffer.from(res.data.avatar, 'base64').toString()
                setAvatar(base64Image)
            }
        })
    }

    return (
        <>
            <div className='flex py-16 bg-gray-300 mt-60 w-[80%] mx-auto mb:w-[90%] mb:mt-72 mb:mb-10 mb:py-2'>
                <div className='container mx-auto px-3'>
                    <div className='flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
                        <div className='rounded-full mx-auto'>
                            <input id='avatar' type='file' hidden onChange={(e) => handleShowUpdateAvatar(e)} />

                            <label htmlFor='avatar' className='cursor-pointer'>
                                {profile?.avatar ? (
                                    <div className='rounded-full mx-auto'>
                                        <Image
                                            width={300}
                                            height={300}
                                            alt='Avatar'
                                            src={showAvatar ? showAvatar : avatar}
                                            className='shadow-xl rounded-full h-40 w-40 border-none flex -m-10 max-w-150-px cursor-pointer bg-contain bg-no-repeat p-2 mx-auto'
                                        />
                                    </div>
                                ) : (
                                    <div className='rounded-full mx-auto'>
                                        <Image
                                            width={300}
                                            height={300}
                                            alt='Avatar'
                                            src={showAvatar ? showAvatar : assets.images.avatar}
                                            className='shadow-xl rounded-full h-40 w-40 border-none flex -m-10 max-w-150-px cursor-pointer bg-contain bg-no-repeat p-2 mx-auto'
                                        />
                                    </div>
                                )}
                            </label>
                        </div>

                        <button
                            className='w-16 bg-gray-400 mx-auto mt-14 text-lg p-1 rounded-lg shadow-md hover:bg-orange-300 text-white'
                            onClick={handleGetAvatar}
                        >
                            Save
                        </button>
                        {profile && (
                            <div className='text-center mt-3'>
                                <h3 className='text-4xl font-semibold leading-normal mb-2 text-blueGray-700'>
                                    {profile?.username ? profile.username : ''}
                                </h3>
                                <div className='text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold uppercase text-gray-400'>
                                    <i className='fas fa-map-marker-alt mr-2 text-lg'></i>
                                    {profile?.address ? profile.address : ''}
                                </div>
                                <div className='mb-1 text-blueGray-600 mt-5 text-gray-400'>
                                    <i className='fas fa-venus-mars mr-2 text-lg'></i>
                                    {profile?.gender ? profile.gender : ''}
                                </div>
                                <div className='mb-1 text-blueGray-600 text-gray-400'>
                                    <i className='fas fa-envelope mr-2 text-lg'></i>
                                    {profile?.email ? profile.email : ''}
                                </div>
                            </div>
                        )}
                        <div className='mt-1 py-10 border-t border-gray-400 text-center'>
                            <div className='flex flex-wrap justify-center'>
                                <div className='flex flex-col text-center'>
                                    <div className='uppercase font-semibold text-xl'>Statistics</div>

                                    <div className='w-full lg:w-4/12 px-4 lg:order-1 mx-auto'>
                                        <div className='flex flex-row gap-4 justify-center py-2 lg:pt-4 pt-4'>
                                            <div className='p-3 text-center'>
                                                <div className='text-xl font-bold block uppercase tracking-wide text-gray-600'>
                                                    0
                                                </div>
                                                <div className='text-sm text-gray-400'>Vouchers</div>
                                            </div>
                                            <div className='p-3 text-center'>
                                                <div className='text-xl font-bold block uppercase tracking-wide text-gray-600'>
                                                    10
                                                </div>
                                                <div className='text-sm text-gray-400'>Favorites</div>
                                            </div>
                                            <div className='p-3 text-center'>
                                                <div className='text-xl font-bold block uppercase tracking-wide text-gray-600'>
                                                    89
                                                </div>
                                                <div className='text-sm text-gray-400'>Comments</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
