import React from 'react'

function ProfileItem({ onClick, label }) {
    return (
        <div>
            <div onClick={onClick} className='px-2 py-2 hover:bg-neutral-200 transition-all font-medium'>
                {label}
            </div>
        </div>
    )
}

export default ProfileItem
