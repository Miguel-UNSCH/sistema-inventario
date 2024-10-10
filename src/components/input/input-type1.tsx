"use client"

import React, { useState } from 'react'

interface FloatingLabelInputProps {
    id: string
    label: string
    type?: string
    required?: boolean
}

export default function FloatingLabelInput({ id, label, type = 'text', required }: FloatingLabelInputProps) {
    const [value, setValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(value !== '')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                className="bg-transparent text-gray-600 dark:text-white peer w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                placeholder={label}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete='off'
            />
            <label
                htmlFor={id}
                className={`absolute flex gap-2 left-3 transition-all duration-200 ${(isFocused) ? `-top-2.5 text-xs text-primary bg-[#FAFAFA] dark:bg-[#23262B] px-2` : 'top-2 text-gray-400 cursor-text'}
                `}
            >
                {label}
                <span>{ required ? 
                    <span className='text-sm'>**</span> 
                    : '' }</span>
            </label>
        </div>
    )
}