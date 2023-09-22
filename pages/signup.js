'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, TextField, InputAdornment } from '@mui/material'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import assets from '@/assets'
import Wrapper from '@/app/Components/Client/Layout/Wrapper'
import authApi from '@/app/api/authApi'
import { signin } from '@/app/redux/reducers/authSlice'
import { ToastContainer } from 'react-toastify'
import toasts from '@/app/Components/Common/Toast/Toast'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

function SignUpPage() {
    return (
        <Wrapper>
            <SignUp />
        </Wrapper>
    )
}

function SignUp() {
    const router = useRouter()
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        address: '',
        phone: '',
        gender: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        console.log('check sign up input: ', input)
    })

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleInput = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSingUp = async () => {
        setErrorMessage('')
        try {
            let data = await authApi.signUpApi(input)

            if (data && data.errCode !== 0) {
                setErrorMessage(data.message)
                toasts.errorTopCenter('Sign up failed !')
            }

            if (data && data.errCode === 0) {
                toasts.successTopCenter('Sign up successfully !')

                const newUser = {
                    loggedIn: true,
                    id: data.customer.id,
                    email: data.customer.email,
                    username: data.customer.username,
                    role: data.customer.role
                }
                dispatch(signin(newUser))

                if (newUser.loggedIn && newUser.role === 'Customer') {
                    router.push('/signin')
                }
            }
        } catch (error) {
            if (error.response) {
                console.log('error.response.data: ', error.response.data)
                if (error.response.data) {
                    setErrorMessage(error.response.data.message)
                }
            }
        }
    }

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-gray-500'>
            <div className='relative lt:w-900 lt:h-600 rounded-lg bg-slate-300 overflow-hidden m-5'>
                <div
                    className='
                        absolute lt:w-900 lt:h-600 bg-gradient-to-r from-rose-500 via-rose-400 
                        to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right
                    '
                ></div>
                <div
                    className='
                        absolute lt:w-900 lt:h-600 bg-gradient-to-r from-rose-500 via-rose-400 
                        to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right
                    '
                ></div>
                <div
                    className='
                        absolute bg-slate-300 inset-1 rounded-lg z-10 
                    '
                >
                    <form action='submit' className='rounded-lg border-gray-600 shadow-md h-600 p-2'>
                        <div className='flex flex-row gap-0 rounded-lg items-center justify-center h-[575px]'>
                            <div className='w-3/5 p-5 rounded-l-lg flex flex-col gap-1 items-center'>
                                <Image alt='Logo' height='80' width='80' src={assets.images.logo} priority={true} />
                                <div className='text-gray-500'>Welcome to ShoeShop !</div>
                                <div className='text-gray-500 text-12 '>
                                    Please fill out the information completely !
                                </div>
                                <TextField
                                    size='small'
                                    variant='standard'
                                    helperText='Enter your full name'
                                    className='w-300'
                                    name='fullName'
                                    value={input.fullName}
                                    autoFocus
                                    autoComplete='off'
                                    onChange={handleInput}
                                    InputProps={{ style: { fontSize: 14 } }}
                                    required
                                />
                                <TextField
                                    size='small'
                                    variant='standard'
                                    helperText='Enter your email'
                                    className='w-300'
                                    name='email'
                                    value={input.email}
                                    onChange={handleInput}
                                    InputProps={{ style: { fontSize: 14 } }}
                                    required
                                />
                                <TextField
                                    size='small'
                                    variant='standard'
                                    helperText='Enter your username'
                                    className='w-300'
                                    name='username'
                                    value={input.username}
                                    autoComplete='off'
                                    onChange={handleInput}
                                    InputProps={{ style: { fontSize: 14 } }}
                                    required
                                />
                                <TextField
                                    size='small'
                                    variant='standard'
                                    helperText='Enter your password'
                                    className='w-300'
                                    name='password'
                                    autoComplete='off'
                                    type={showPassword ? 'text' : 'password'}
                                    value={input.password}
                                    onChange={handleInput}
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
                                        ),
                                        style: { fontSize: 14 }
                                    }}
                                    required
                                />
                                <TextField
                                    size='small'
                                    variant='standard'
                                    helperText='Enter your address'
                                    className='w-300'
                                    name='address'
                                    value={input.address}
                                    autoComplete='address'
                                    onChange={handleInput}
                                    InputProps={{ style: { fontSize: 14 } }}
                                />
                                <TextField
                                    size='small'
                                    variant='standard'
                                    helperText='Enter your phone'
                                    className='w-300'
                                    name='phone'
                                    value={input.phone}
                                    autoComplete='off'
                                    onChange={handleInput}
                                    InputProps={{ style: { fontSize: 14 } }}
                                    required
                                />
                                <div className='flex flex-row justify-between gap-[180px] mt-2'>
                                    <div className='flex flex-row items-center'>
                                        <input
                                            type='checkbox'
                                            name='gender'
                                            value='Male'
                                            style={{ scale: '1.4' }}
                                            checked={input.gender === 'Male'}
                                            onChange={handleCheckbox}
                                        />
                                        <div className='ml-2 font-light text-16'>Male</div>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <input
                                            type='checkbox'
                                            name='gender'
                                            value='Female'
                                            style={{ scale: '1.4' }}
                                            checked={input.gender === 'Female'}
                                            onChange={handleCheckbox}
                                        />
                                        <div className='ml-2 font-light text-16'>Female</div>
                                    </div>
                                </div>

                                {/* Error Notification */}
                                <div className='w-full text-red-600 text-center text-sm'>{errorMessage}</div>

                                <Button
                                    variant='contained'
                                    className='bg-rose-600 rounded-full text-white text-12 w-32'
                                    onClick={handleSingUp}
                                >
                                    Sign Up
                                </Button>
                            </div>

                            <div
                                className='
                                    w-2/5 flex flex-col gap-5 bg-rose-400 items-center justify-center 
                                    text-white px-auto p-5 rounded-r-lg mb:hidden h-full
                                '
                            >
                                <div className='md:text-2xl font-bold flex'>Welcome !</div>
                                <div className='md:text-sm text-center'>Come to join with us now.</div>
                                <Button
                                    variant='outlined'
                                    href='/signin'
                                    className='rounded-full border-slate-50 text-white text-12 w-32'
                                >
                                    Sign In
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

export default SignUpPage
