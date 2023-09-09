'use client'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Image from 'next/image'
import { MdManageAccounts, MdProductionQuantityLimits } from 'react-icons/md'
import { BiLogOut } from 'react-icons/bi'
import { IoTicketOutline } from 'react-icons/io5'
import { AiOutlineLeft } from 'react-icons/ai'
import { TbShoe } from 'react-icons/tb'
import assets from '@/assets'

const menuItems = [
    { id: 1, label: 'Manage Products', icon: TbShoe, link: '/admin/manage_products' },
    { id: 2, label: 'Create New Products', icon: MdProductionQuantityLimits, link: '/admin/post_products' },
    { id: 3, label: 'Manage Accounts', icon: MdManageAccounts, link: '/admin/manage_accounts' },
    { id: 4, label: 'Manage Vouchers', icon: IoTicketOutline, link: '/admin/manage_vouchers' }
]

const AdminSideBar = () => {
    const router = useRouter()
    const [toggleCollapse, setToggleCollapse] = useState(false)
    const [isCollapsible, setIsCollapsible] = useState(false)

    const wrapperClasses = classNames(
        'h-screen px-1 pt-8 pb-4 bg-gradient-to-b from-green-400 via-green-500 flex justify-between flex-col',
        {
            ['w-80']: !toggleCollapse,
            ['w-40']: toggleCollapse
        }
    )

    const collapseIconClasses = classNames('p-4 rounded bg-light-lighter absolute right-0', {
        'rotate-180': toggleCollapse
    })

    const onMouseOver = () => {
        setIsCollapsible(!isCollapsible)
    }

    const handleSidebarToggle = () => {
        setToggleCollapse(!toggleCollapse)
    }

    return (
        <>
            <div className='flex flex-row lg:w-2/5 max-w-xs'>
                <div
                    className={wrapperClasses}
                    onMouseEnter={onMouseOver}
                    onMouseLeave={onMouseOver}
                    style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
                >
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-between relative'>
                            <div className='flex items-center pl-1 gap-4'>
                                <Image alt='Logo' src={assets.images.logo} height='120' width='120' />
                                <span
                                    className={classNames('block mt-2 text-2xl font-bold text-slate-900', {
                                        hidden: toggleCollapse
                                    })}
                                >
                                    Admin DashBoard
                                </span>
                            </div>
                            {isCollapsible && (
                                <button className={collapseIconClasses} onClick={handleSidebarToggle}>
                                    <AiOutlineLeft size={28} />
                                </button>
                            )}
                        </div>

                        <div className='flex flex-col items-start mt-24'>
                            {menuItems.map(({ icon: Icon, ...menu }) => {
                                return (
                                    <div
                                        key={menu.id}
                                        className='flex items-center cursor-pointer hover:bg-yellow-50 rounded w-full overflow-hidden whitespace-nowrap'
                                    >
                                        <Link href={menu.link}>
                                            <div className='flex py-4 px-3 items-center w-full h-full'>
                                                <div style={{ width: '2.5rem' }}>
                                                    <Icon size={28} />
                                                </div>
                                                {!toggleCollapse && (
                                                    <span className='text-lg font-medium'>{menu.label}</span>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='flex items-center cursor-pointer rounded w-full overflow-hidden px-3 py-4'>
                        <div style={{ width: '2.5rem' }}>
                            <BiLogOut size={28} />
                        </div>
                        {!toggleCollapse && (
                            <Link href={'/signin'}>
                                <div className={classNames('text-md font-medium text-text-light')}>Sign out</div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSideBar
