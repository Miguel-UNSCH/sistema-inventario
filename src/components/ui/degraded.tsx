"use client"

import { FC } from 'react'

interface DegradedProps {
    text: string
    fromColor: string
    toColor: string
    fontWeight?: 'bold' | 'extrabold' | 'normal'
}

export const Degraded: FC<DegradedProps> = ({
    text,
    fromColor,
    toColor,
    fontWeight = 'normal'
}) => {
    const fontWeightClass =
        fontWeight === 'bold' ? 'font-bold' :
            fontWeight === 'extrabold' ? 'font-extrabold' :
                ''

    return (
        <div
            className={`bg-gradient-to-r text-transparent bg-clip-text leading-normal ${fontWeightClass}`}
            style={{ backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})` }}
        >
            {text}
        </div>
    )
}