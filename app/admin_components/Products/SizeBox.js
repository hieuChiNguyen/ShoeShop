import React from 'react'

function SizeBox({ onChange, label }) {
    return (
        <div className='flex flex-row gap-2'>
            <div className='font-medium text-16'>{label} </div>
            <input
                type='checkbox'
                name='size'
                value={`${label}`}
                className='scale-150 cursor-pointer'
                onChange={onChange}
            />
        </div>
    )
}

export default SizeBox
