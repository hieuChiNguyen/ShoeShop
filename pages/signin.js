'use client'
import React, { useEffect, useState } from 'react'
import { AiFillLock, AiFillGoogleCircle, AiFillGithub, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BiLogoFacebookCircle } from 'react-icons/bi'
import { Button, TextField, InputAdornment } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { signin } from '@/app/redux/reducers/authSlice'
import authApi from '@/app/api/authApi'
import Wrapper from '@/app/Components/Client/Layout/Wrapper'
import toasts from '@/app/Components/Common/Toast/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

function SignInPage() {
    return (
        <Wrapper>
            <SignIn />
        </Wrapper>
    )
}

function SignIn() {
    const router = useRouter()
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        console.log('check sign in input: ', input)
    }, [input])

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log('check input: ', input)
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await handleSignIn()
        }
    }

    const handleSignIn = async () => {
        setErrorMessage('')
        try {
            let data = await authApi.signInApi(input.email, input.password)

            // Save access token into local storage
            localStorage.setItem('accessToken', data.user.accessToken)

            // Fail to sign in
            if (data && data.errCode !== 0) {
                setErrorMessage(data.message)
                toasts.errorTopCenter('Sign in failed !')
            }

            // Success to sign in
            if (data && data.errCode === 0) {
                toasts.successTopCenter('Sign in successfully !')

                const signInUser = {
                    loggedIn: true,
                    id: data.user.id,
                    email: data.user.email,
                    username: data.user.username,
                    role: data.user.role
                }

                dispatch(signin(signInUser))

                if (signInUser.role === 'Admin') {
                    sessionStorage.setItem('isAdmin', true)
                    setTimeout(function () {
                        router.push('/admin')
                    }, 1500)
                } else {
                    setTimeout(function () {
                        router.push('/')
                    }, 1500)
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    setErrorMessage(error.response.data.message)
                }
            }
        }
    }

    return (
        <div className='flex flex-col w-full min-h-screen items-center justify-center bg-gray-500'>
            <div className='relative w-800 h-96 rounded-lg bg-slate-300 overflow-hidden  mb:w-[85%] mb:-mt-20 mb:h-500'>
                <div
                    className='
                        absolute w-800 h-96 bg-gradient-to-r from-rose-500 via-rose-400 
                        to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right mb:w-[85%] mb:h-auto
                    '
                ></div>
                <div
                    className='
                        absolute w-800 h-96 bg-gradient-to-r from-rose-500 via-rose-400 
                        to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right
                    '
                ></div>
                <div
                    className='
                        absolute bg-slate-300 inset-1 rounded-lg z-10
                    '
                >
                    <form action='submit' className='rounded-lg border-gray-600 shadow-md h-auto p-2'>
                        <div className='flex flex-row gap-0 rounded-lg items-center justify-center h-350 mb:h-[475px]'>
                            <div className='w-4/5 p-5 rounded-l-lg flex flex-col gap-2 items-center'>
                                <AiFillLock size={30} className='text-rose-400' />
                                <div className='text-rose-400 font-extrabold text-2xl mb:my-3 mb:text-xl mb:inline-block mb:overflow-hidden mb:w- mb:mx-auto'>
                                    Sign In to Account
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <AiFillGoogleCircle size={28} />
                                    <AiFillGithub size={28} />
                                    <BiLogoFacebookCircle size={28} />
                                </div>
                                <div className='text-gray-500 mb:mt-2'>or use your email account</div>
                                <TextField
                                    id='email'
                                    size='small'
                                    variant='standard'
                                    helperText='Enter your email'
                                    className='w-300'
                                    name='email'
                                    value={input.email}
                                    autoFocus
                                    autoComplete='email'
                                    onChange={handleInput}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                />
                                <TextField
                                    id='password'
                                    size='small'
                                    variant='standard'
                                    helperText='Enter your password'
                                    className='w-300'
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={input.password}
                                    onChange={handleInput}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                {!showPassword ? (
                                                    <AiFillEyeInvisible
                                                        onClick={handleShowHidePassword}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                ) : (
                                                    <AiFillEye
                                                        onClick={handleShowHidePassword}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                )}
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <div className='flex flex-row gap-20 items-center justify-center mb:gap-8 mb:w-72 mb:mt-2 mb:justify-between'>
                                    <div className='font-light text-sm mb:w-2/5'>
                                        <input type='checkbox' name='' id='' />
                                        Remember me
                                    </div>
                                    <div className='font-light text-sm cursor-pointer hover:underline mb:w-2/5'>
                                        Forgot Password?
                                    </div>
                                </div>

                                {/* Error Notification */}
                                <div className='w-full text-red-600 text-center'>{errorMessage}</div>

                                <Button
                                    variant='contained'
                                    // href='/'
                                    className='bg-rose-600 rounded-full text-white text-12 w-32 mb:w-72'
                                    onClick={handleSignIn}
                                >
                                    Sign In
                                </Button>

                                <div className='flex font-semibold text-rose-500 hover:underline text-lg mt-2 lt:hidden tl:hidden'>
                                    Sign Up ?
                                </div>
                            </div>

                            <div
                                className='
                                    w-2/5 flex flex-col gap-5 bg-rose-400 items-center justify-center 
                                    text-white px-auto p-5 rounded-r-lg mb:hidden h-full
                                '
                            >
                                <div className='lt:text-2xl font-bold flex'>Welcome !</div>
                                <div className='lt:text-sm text-center'>
                                    Fill up personal information and
                                    <br />
                                    start new journey with us.
                                </div>
                                <Button
                                    variant='outlined'
                                    href='/signup'
                                    className='rounded-full border-slate-50 text-white text-12 w-32 hover:font-semibold'
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignInPage
