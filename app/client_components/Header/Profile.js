'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

import assets from '@/assets'
import ProfileItem from './ProfileItem'
import userApi from '@/app/api/userApi'
import { signout } from '@/app/redux/reducers/authSlice'

function Profile() {
    const router = useRouter()
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [avatar, setAvatar] = useState('')

    const handleShowProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu)
    }

    useEffect(() => {
        async function fetchData() {
            await getAvatar()
        }
        fetchData()
    }, [])

    const getAvatar = async () => {
        if (authState.loggedIn === true) {
            let response = await userApi.getUserAvatar(authState.id).then((res) => {
                if (res && res.errCode === 0) {
                    let base64Image = Buffer.from(res.avatar, 'base64').toString()
                    setAvatar(base64Image)
                }
            })
        }
    }

    const handleLogout = () => {
        dispatch(signout())
        setShowProfileMenu(!showProfileMenu)
        router.push('/')
    }

    return (
        <div
            className='
                tl:inline-block
                lt:inline-block
                rounded-full
                my-auto
                cursor-pointer
                hover:shadow-md
                mb:mr-2
            '
        >
            <Image
                alt='AvatarIcon'
                height={60}
                width={60}
                src={authState.loggedIn && avatar ? avatar : assets.images.avatar}
                className='tl:block lt:block rounded-full p-1 h-[60px] mb:h-14 mb:w-14'
                onClick={handleShowProfileMenu}
            />
            <div className='absolute rounded-xl shadow-md lt:w-40 bg-white overflow-hidden lt:right-10 top-24 lt:text-16 z-10 mb:hidden'>
                <div className='flex flex-col cursor-pointer'>
                    {authState.loggedIn ? (
                        <>
                            {showProfileMenu ? (
                                <>
                                    <ProfileItem onClick={() => router.push('/profile')} label='Profile' />
                                    <ProfileItem onClick={() => router.push('/cart')} label='My Cart' />
                                    <hr className='h-[2px] bg-gray-200' />
                                    <ProfileItem onClick={handleLogout} label='Sign out' />
                                </>
                            ) : null}
                        </>
                    ) : (
                        <>
                            {showProfileMenu ? (
                                <>
                                    <ProfileItem onClick={() => router.push('/signin')} label='Sign In' />
                                    <ProfileItem onClick={() => router.push('/signup')} label='Sign Up' />
                                </>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
