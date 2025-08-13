import React from 'react';
import type { Sport } from 'types/calendar';

interface RecordCreateCateProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    sport: Sport;
    selected?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function RecordCreateCate ({
    text,
    sport,
    selected,
    onClick,
    className
}: RecordCreateCateProps) {

    const src = `/images/${sport}_character.svg`;

    return (
        <button
            type='button'
            onClick={onClick}
            aria-pressed={selected}
            className={`flex flex-col items-center justify-start rounded-3xl p-4 w-[220px] h-[260px]
                ${selected ? 'bg-[#fff0b3]' : 'bg-transparent'} ${className}`}
        >
            <p className='mb-2 text-xl font-semibold'>{text}</p>
            <img
                src={src}
                alt={`${text} 캐릭터`}
                className='w-[160px] h-[160px] object-contain'
                draggable={false}
            />
        </button>



    )
}