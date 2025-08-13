import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import type { IconBaseProps } from 'react-icons';


interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    fallbackPath?: string;
}

export function BackButton ({
    className = '',
    fallbackPath = '/',
}: BackButtonProps) {
    const ChevronLeftIcon = FiChevronLeft as unknown as React.FC<IconBaseProps>;

    const navigate = useNavigate();

    const handleClick = (): void => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(fallbackPath, { replace: true});
        }
    };

    return (
        <button
            type='button'
            onClick={handleClick}
            aria-label='뒤로가기'
            className={`group grid place-items-center w-12 h-12 rounded-full active:bg-black/10 ${className}`}
        >
            <ChevronLeftIcon size={28} aria-hidden />

        </button>

    );

}