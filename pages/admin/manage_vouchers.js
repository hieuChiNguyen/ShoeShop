import React from 'react'
import '@/styles/globals.css'
import AdminSideBar from '@/app/Components/Admin/AdminSideBar'

function ManageVouchersPage() {
    return (
        <div className='flex flex-row'>
            <AdminSideBar />
            <ManageVouchers />
        </div>
    )
}

const ManageVouchers = () => {
    return (
        <div className='m-4 w-3/4 float-right right-0 mx-auto mt-0'>
            <div>Voucher Pages</div>
        </div>
    )
}

export default ManageVouchersPage
