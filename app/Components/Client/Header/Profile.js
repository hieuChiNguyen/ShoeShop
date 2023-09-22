'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import assets from '@/assets'
import userApi from '@/app/api/userApi'
import { signout } from '@/app/redux/reducers/authSlice'
import Link from 'next/link'
import authApi from '@/app/api/authApi'

function Profile() {
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [avatar, setAvatar] = useState('')

    const handleShowProfileMenu = (e) => {
        e.preventDefault()
        setShowProfileMenu(!showProfileMenu)
    }

    const getAvatar = async () => {
        try {
            if (authState.loggedIn === true) {
                let response = await userApi.getUserAvatar(authState.id).then((res) => {
                    if (res && res.errCode === 0) {
                        let base64Image = Buffer.from(res.avatar, 'base64').toString()
                        setAvatar(base64Image)
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAvatar()
    }, [])

    const handleSignOut = async () => {
        let res = await authApi.signOutApi()
        console.log('check res sign out: ', res)
        dispatch(signout())
        setShowProfileMenu(!showProfileMenu)
        localStorage.removeItem('accessToken')
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
                onClick={(e) => handleShowProfileMenu(e)}
            />
            <div className='absolute rounded-xl shadow-md lt:w-40 bg-white overflow-hidden lt:right-10 top-24 lt:text-16 z-10 mb:hidden'>
                <div className='flex flex-col cursor-pointer'>
                    {authState.loggedIn ? (
                        <>
                            {showProfileMenu ? (
                                <>
                                    <Link href={'/profile'}>
                                        <div className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'>
                                            Profile
                                        </div>
                                    </Link>
                                    <Link href={'/cart'}>
                                        <div className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'>
                                            My Cart
                                        </div>
                                    </Link>
                                    <hr className='h-[2px] bg-gray-200' />
                                    <Link href={'/'}>
                                        <div
                                            className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'
                                            onClick={handleSignOut}
                                        >
                                            Sign Out
                                        </div>
                                    </Link>
                                </>
                            ) : null}
                        </>
                    ) : (
                        <>
                            {showProfileMenu ? (
                                <>
                                    <Link href={'/signin'}>
                                        <div className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'>
                                            Sign In
                                        </div>
                                    </Link>
                                    <Link href={'/signup'}>
                                        <div className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'>
                                            Sign Up
                                        </div>
                                    </Link>
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
