import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    error?: string;
    containerClassName?: string;
    sizeVariant?: 'full' | 'half';
    align?: 'left' | 'center' | 'right';
}

export function InputField({
    label,
    error,
    className,
    containerClassName,
    sizeVariant = 'full',
    align = 'center',
    ...props
}: InputFieldProps) {

    const widthClass = sizeVariant === 'half' ? 'w-40' : 'w-80';
    const alignClass = align === 'center' ? 'mx-auto'
    : align === 'right' ? 'ml-auto'
    : '';

    return (
        <div className={`space-y-2 ${containerClassName ?? ''}`}>
            {label && (
                <label className={`block ${widthClass} ${alignClass} text-lg font-semibold text-gray-900`}>
                    {label}
                </label>
            )}

            <div
                className={`block ${widthClass} ${alignClass} rounded-2xl border-2 border-black bg- shadow-sm
                    focus-within:ring-1 focus-within:ring-black/70`}
            >
                <input
                className={`w-full bg-transparent px-4 py-3 outline-none bg-[#FCF5E2] placeholder:text-gray-400 ${className ?? ''}`}
                {...props}
                />
            </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}