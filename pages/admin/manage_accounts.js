'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import assets from '@/assets'
import userApi from '@/app/api/userApi'
import ModalAddUser from '@/app/admin_components/Accounts/ModalAddUser'
import ModalEditUser from '@/app/admin_components/Accounts/ModalEditUser'
import AdminSideBar from '@/app/admin_components/AdminSideBar'
import { emitter } from '@/utils/emitter'
import '@/styles/accounts.css'
import '@/styles/globals.css'

function ManageAccountsPage() {
    return (
        <div className='flex flex-row'>
            <AdminSideBar />
            <ManageAccounts />
        </div>
    )
}

const ManageAccounts = () => {
    const [arrayUsers, setArrayUsers] = useState([])
    const [showModalEdit, setShowModalEdit] = useState(false)

    const [userEdit, setUserEdit] = useState({
        id: '',
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
        setUserEdit({
            ...userEdit,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {}, [userEdit])

    const toggle = () => setShowModalEdit(!showModalEdit)

    useEffect(() => {
        async function fetchData() {
            await manageAllUsers()
        }
        fetchData()
    }, [])

    const manageAllUsers = async () => {
        let response = await userApi
            .getAllUsers('ALL')

            .then((res) => {
                if (res && res.errCode === 0) {
                    setArrayUsers(res.users)
                }
            })
    }

    const createNewUser = async (data) => {
        try {
            let response = await userApi.createNewUser(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await manageAllUsers()
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateUser = async (user) => {
        try {
            let response = await userApi.updateUser(user)

            if (response && response.errCode === 0) {
                await manageAllUsers()
                setShowModalEdit(false)
            } else {
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditUser = (user) => {
        toggle()
        setUserEdit({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            address: user.address,
            username: user.username,
            gender: user.gender,
            phone: user.phone,
            role: user.role
        })
    }

    const handleDeleteUser = async (user) => {
        try {
            let response = await userApi.deleteUser(user.id)
            if (response && response.errCode === 0) {
                await manageAllUsers()
            } else {
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='m-4 w-3/4 float-right right-0 mx-auto mt-0'>
            <div className='w-auto bg-slate-200 p-2'>
                <div className='m-6 text-center items-center justify-center font-medium text-2xl'>
                    Manage Accounts Information
                    <div>
                        <div className='w-full bg-slate-400 h-1'></div>
                    </div>
                    <ModalAddUser createNewUser={createNewUser} />
                    {showModalEdit && (
                        <ModalEditUser
                            handleEditUser={handleEditUser}
                            toggle={toggle}
                            handleUpdateUser={handleUpdateUser}
                            userEdit={userEdit}
                            handleChange={handleChange}
                        />
                    )}
                </div>
                <div>
                    <table id='customers' className='p-2 text-center border-collapse w-full items-center m-auto'>
                        <tbody className='p-2 text-center'>
                            <tr className='pt-3 pb-3 text-center text-white'>
                                <th className='bg-green-600'>Full Name</th>
                                <th className='bg-green-600'>Email</th>
                                <th className='bg-green-600'>Address</th>
                                <th className='bg-green-600'>Phone</th>
                                <th className='bg-green-600'>Gender</th>
                                <th className='bg-green-600'>Role</th>
                                <th className='bg-green-600'>Actions</th>
                            </tr>

                            {arrayUsers &&
                                arrayUsers.map((user, index) => {
                                    return (
                                        <tr key={index} className='bg-slate-300 hover:bg-green-400'>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button
                                                    className='p-2 border rounded-lg m-1 w-20 bg-slate-400 hover:bg-orange-500'
                                                    onClick={() => handleEditUser(user)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='p-2 border rounded-lg m-1 w-20 bg-slate-400 hover:bg-rose-600'
                                                    onClick={() => handleDeleteUser(user)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
                <Image
                    src={assets.images.logo}
                    alt='ShoeShopLogo'
                    placeholder='blur'
                    className='m-4 p-1 transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white'
                />
            </div>
        </div>
    )
}

export default ManageAccountsPage
