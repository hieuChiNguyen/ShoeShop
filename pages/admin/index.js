import React from 'react'
import AdminSideBar from '@/app/Components/Admin/AdminSideBar'
import '@/styles/globals.css'

function AdminPage() {
    return (
        <div className='flex flex-row'>
            <AdminSideBar />
            <AdminStatistics />
        </div>
    )
}

function AdminStatistics() {
    return <div>Statistic here !</div>
}

export default AdminPage
