import React from 'react';

export interface SegmentOption<T extends string = string> {
    label: React.ReactNode;
    value: T;
    disabled?: boolean;
}

interface SegmentToggleProps<T extends string = string> {
    options: SegmentOption<T>[];
    className?: string;
    value: T;
    onChange: (v:T) => void;    
    size?: 'sm' | 'md';
}

export function SegmentToggle<T extends string = string>({
    options,
    value,
    onChange,
    className,
    size = 'md'
}: SegmentToggleProps<T>) {

    const optionCountClass =
    options.length === 2 ? 'flex-[1_1_50%]'
    : options.length === 3 ? 'flex-[1_1_33.33%]' 
    : 'flex-1';

    const sizeStyles = {
        sm: {
            padding: 'px-2',
            font: 'text-sm',
            height: 'h-6',
        },
        md: {
            padding: 'py-2 px-4',
            font: 'text-base',
            height: 'h-12',
        },
    };

    return(
        <div className={`flex items-center justify-center gap-3 ${className ?? ''}`}>
            <div
                role='radiogroup'
                className='rounded-xl bg-[#FFEDAD] p-0.5 flex w-80'
            >
                {options.map((opt) => {
                    const selected = opt.value === value;
                    return(
                        <button
                            key={String(opt.value)}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            disabled={opt.disabled}
                            onClick={() => !opt.disabled && onChange(opt.value)}
                            className={`
                                ${optionCountClass}
                                rounded-xl transition-colors
                                ${sizeStyles[size].padding} ${sizeStyles[size].font} ${sizeStyles[size].height}
                                ${selected ? 'bg-[#4D7E73] text-[#FCF5E2]' : 'text-[#4D7E73]/40'}
                                disabled:opacity-50 disabled:cursor-not-allowed
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40
                            `}
                        >
                            {opt.label}
                        </button>
                    );
                })}
            </div>
        </div>

    )

}
