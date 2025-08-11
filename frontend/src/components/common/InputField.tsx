import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    error?: string;
    containerClassName?: string;
}

export function InputField({
    label,
    error,
    className,
    containerClassName,
    ...props
}: InputFieldProps) {
    return (
        <div className={`space-y-2 ${containerClassName ?? ''}`}>
            {label && (
                <label className="block text-lg font-semibold text-gray-900 ml-4">
                    {label}
                </label>
            )}

            <div
                className={`block w-80 mx-auto rounded-2xl border-2 border-black bg- shadow-sm
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