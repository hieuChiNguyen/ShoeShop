'use client'
import React, { useState } from 'react'
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation'

function UserMenu({ openModalUserMenu, closeModalUserMenu, showModalUserMenu }) {
    const router = useRouter()
    const [hoverArrowDownIndex, setHoverArrowDownIndex] = useState(-1)

    const icons = new Array(4).fill(<RiArrowDropUpLine size={28} />)
    const labels = ['Products', 'Male', 'FeMale', 'Help']

    const handleClick = (path) => {
        closeModalUserMenu()
        setTimeout(() => {
            router.push(path.toLowerCase())
        }, 1000)
    }

    const handleMouseOver = (index) => {
        setHoverArrowDownIndex(index)
        openModalUserMenu()
    }

    const handleMouseLeave = () => {
        setHoverArrowDownIndex(-1)
        closeModalUserMenu()
    }

    const handleOpenModalUserMenu = () => {
        if (hoverArrowDownIndex !== -1) {
            openModalUserMenu()
        }
    }

    return (
        <div
            className='
                lt:flex 
                flex-row
                lt:gap-3
                items-center
                font-medium
                text-xl
                transition
                hidden
            '
            onMouseOver={handleOpenModalUserMenu}
        >
            {icons.map((icon, index) => (
                <div
                    key={index}
                    className={`hover:text-orange-500 cursor-pointer border-r-2 px-4 flex flex-row items-center h-fit `}
                    onClick={() => handleClick(`/${labels[index]}`)}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseLeave={handleMouseLeave}
                >
                    {index === hoverArrowDownIndex ? <RiArrowDropDownLine size={28} /> : icon}
                    <div key={index}>{labels[index]}</div>
                </div>
            ))}
        </div>
    )
}

export default UserMenu
