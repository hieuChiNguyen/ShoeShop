'use client'
import React, { useState, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CiSquareRemove } from 'react-icons/ci'
import { emitter } from '@/utils/emitter'

const ModalAddUser = ({ createNewUser }) => {
    const [showModal, setShowModal] = useState(false)
    const toggle = () => setShowModal(!showModal)

    const [input, setInput] = useState({
        fullName: '',
        email: '',
        password: '',
        address: '',
        username: '',
        phone: '',
        gender: '',
        role: ''
    })

    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        // console.log('Input', input)
    }, [input])

    const listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // reset state
            setInput({
                fullName: '',
                email: '',
                password: '',
                address: '',
                username: '',
                phone: '',
                gender: '',
                role: ''
            })
        })
    }

    listenToEmitter()

    const checkValidateInput = () => {
        let isValid = true
        let arrayInput = ['fullName', 'email', 'password', 'address', 'phone', 'role']

        for (let i = 0; i < arrayInput.length; i++) {
            // console.log('Check loop: ', input[arrayInput[i]], arrayInput[i])

            if (!input[arrayInput[i]]) {
                isValid = false
                alert('Missing parameters: ' + arrayInput[i])
                break
            }
        }

        return isValid
    }

    const handleAddNewUser = () => {
        let isValid = checkValidateInput()
        if (isValid === true) {
            // Call api
            createNewUser(input)
            setShowModal(false)
        }
    }

    return (
        <>
            <button
                className='bg-lime-500 mx-auto flex p-2 my-4 rounded-md text-lg hover:scale-110'
                type='button'
                onClick={toggle}
            >
                <AiOutlinePlusCircle size={28} className='mx-1' />
                Add new user
            </button>
            {showModal ? (
                <div className='flex mt-9 justify-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none animate-appearDown'>
                    <div className='relative w-[60%] my-4 mx-auto'>
                        <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                            <div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t '>
                                <div className='text-xl font=semibold py-2 mx-auto text-center'>
                                    Create a new user account
                                </div>
                                <button className='bg-transparent border-0 float-right' onClick={toggle}>
                                    <CiSquareRemove size={40} />
                                </button>
                            </div>
                            <div className='relative p-5 flex-auto'>
                                <form className='bg-gray-200 shadow-md rounded-lg px-8 pt-6 pb-8 w-full'>
                                    <div className='flex flex-row items-center justify-between'>
                                        <div className='flex flex-col gap-2'>
                                            <label className='flex text-black text-sm font-semibold '>Full Name</label>
                                            <input
                                                className='w-96 shadow appearance-none border rounded py-1 px-1 text-black text-16'
                                                type='text'
                                                onChange={handleChange}
                                                value={input.fullName || ''}
                                                name='fullName'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='flex text-black text-sm font-semibold'>Email</label>
                                            <input
                                                className='w-96 shadow appearance-none border rounded py-1 px-1 text-black text-16'
                                                type='text'
                                                onChange={handleChange}
                                                value={input.email || ''}
                                                name='email'
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center justify-between'>
                                        <div className='flex flex-col gap-2'>
                                            <label className='flex text-black text-sm font-semibold mt-2'>
                                                Password
                                            </label>
                                            <input
                                                className='w-96 shadow appearance-none border rounded py-1 px-1 text-black text-16'
                                                type='text'
                                                onChange={handleChange}
                                                value={input.password || ''}
                                                name='password'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='flex text-black text-sm font-semibold mt-2'>
                                                Address
                                            </label>
                                            <input
                                                className='w-96 shadow appearance-none border rounded py-1 px-1 text-black text-16'
                                                type='text'
                                                onChange={handleChange}
                                                value={input.address || ''}
                                                name='address'
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center justify-between'>
                                        <div className='flex flex-col gap-2'>
                                            <label className='flex text-black text-sm font-semibold mt-2'>
                                                Username
                                            </label>
                                            <input
                                                className='w-96 shadow appearance-none border rounded py-1 px-1 text-black text-16'
                                                type='text'
                                                onChange={handleChange}
                                                value={input.username || ''}
                                                name='username'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='flex text-black text-sm font-semibold mt-2'>
                                                Phone Number
                                            </label>
                                            <input
                                                className='w-96 shadow appearance-none border rounded py-1 px-1 text-black text-16'
                                                type='text'
                                                onChange={handleChange}
                                                value={input.phone || ''}
                                                name='phone'
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center justify-between'>
                                        <div className='flex flex-col gap-2'>
                                            <label className='flex text-black text-sm font-semibold mt-2'>Gender</label>
                                            <input
                                                className='w-96 shadow appearance-none border rounded py-1 px-1 text-black text-16'
                                                type='text'
                                                onChange={handleChange}
                                                value={input.gender || ''}
                                                name='gender'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='flex text-black text-sm font-semibold mt-2'>Role</label>
                                            <input
                                                className='w-96 shadow appearance-none border rounded py-1 px-1 text-black text-16'
                                                type='text'
                                                onChange={handleChange}
                                                value='Admin'
                                                name='role'
                                                placeholder='Admin'
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                                <button
                                    className='w-40 text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-blue-400 outline-none focus:outline-none mr-1 mb-1'
                                    type='button'
                                    onClick={handleAddNewUser}
                                >
                                    Add new
                                </button>
                                <button
                                    className='w-40 text-red-500 bg-gray-200 hover:bg-neutral-300 hover:shadow-lg rounded font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1'
                                    type='button'
                                    onClick={toggle}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default ModalAddUser
