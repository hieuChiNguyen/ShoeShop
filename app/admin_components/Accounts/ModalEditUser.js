import React from 'react'
import { CiSquareRemove } from 'react-icons/ci'

const ModalEditUser = ({ toggle, handleUpdateUser, handleChange, userEdit }) => {
    const checkValidateUserEdit = () => {
        let isValid = true
        let arrayInput = ['fullName', 'address', 'username', 'phone', 'role']

        for (let i = 0; i < arrayInput.length; i++) {
            if (!userEdit[arrayInput[i]]) {
                isValid = false
                alert('Missing parameters: ' + arrayInput[i])
                break
            }
        }

        return isValid
    }

    const updateUser = () => {
        let isValid = checkValidateUserEdit()
        if (isValid === true) {
            // Call api
            handleUpdateUser(userEdit)
        }
    }

    return (
        <div className='flex mt-10 justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 focus:outline-none animate-appearDown'>
            <div className='relative w-[60%] my-4 mx-auto'>
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    <div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
                        <div className='text-xl font=semibold py-2 mx-auto text-center'>Edit an user account</div>
                        <button className='bg-transparent border-0 float-right' onClick={toggle}>
                            <CiSquareRemove size={40} />
                        </button>
                    </div>
                    <div className='relative p-6 flex-auto'>
                        <form className='bg-gray-200 shadow-md rounded-lg px-8 pt-6 pb-8 w-full'>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <label className='flex text-black text-sm font-semibold'>Email</label>
                                    <input
                                        className='w-96 shadow appearance-none border rounded py-2 px-1 text-black text-16 mb-1'
                                        type='text'
                                        onChange={handleChange}
                                        value={userEdit.email || ''}
                                        name='email'
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='flex text-black text-sm font-semibold '>Full Name</label>
                                    <input
                                        className='w-96 shadow appearance-none border rounded py-2 px-1 text-black text-16 mb-1'
                                        type='text'
                                        onChange={handleChange}
                                        value={userEdit.fullName || ''}
                                        name='fullName'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <label className='flex text-black text-sm font-semibold'>Address</label>
                                    <input
                                        className='w-96 shadow appearance-none border rounded py-2 px-1 text-black text-16 mb-1'
                                        type='text'
                                        onChange={handleChange}
                                        value={userEdit.address || ''}
                                        name='address'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='flex text-black text-sm font-semibold '>Username</label>
                                    <input
                                        className='w-96 shadow appearance-none border rounded py-2 px-1 text-black text-16 mb-1'
                                        type='text'
                                        onChange={handleChange}
                                        value={userEdit.username || ''}
                                        name='username'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <label className='flex text-black text-sm font-semibold'>Phone Number</label>
                                    <input
                                        className='w-96 shadow appearance-none border rounded py-2 px-1 text-black text-16 mb-1'
                                        type='text'
                                        onChange={handleChange}
                                        value={userEdit.phone || ''}
                                        name='phone'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='flex text-black text-sm font-semibold '>Role</label>
                                    <input
                                        className='w-96 shadow appearance-none border rounded py-2 px-1 text-black text-16 mb-1'
                                        type='text'
                                        onChange={handleChange}
                                        value={userEdit.role || ''}
                                        name='role'
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
                            onClick={updateUser}
                        >
                            Update
                        </button>
                        <button
                            className='w-40 text-red-500 bg-gray-200 hover:bg-neutral-300 hover:shadow-lg rounded font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1'
                            type='button'
                            onClick={toggle}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditUser
