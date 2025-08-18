import * as React from 'react';

interface RecordReviewProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: React.ReactNode;
    autoGrow?: boolean;
    minRows?: number;
    containerClassName?: string;
    className?: string;
}
export function RecordReview ({
    label,
    autoGrow = true,
    minRows = 1,
    containerClassName,
    className,
    onChange,
    value,
    ...props
}: RecordReviewProps) {
    const ref = React.useRef<HTMLTextAreaElement>(null);

    const resize = React.useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`
    }, []);

    React.useEffect(() => {
        if(autoGrow) resize();
    }, [autoGrow, value, resize]);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        if(autoGrow) resize();
        onChange?.(e);
    }

    return(
        <div className={`space-y-2 ${containerClassName ?? ""}`}>
            {label && (
                <label
                className="block w-80 mx-auto text-lg font-semibold text-gray-900"
                >
                {label}
                </label>
            )}

            <div
                className='block w-80 mx-auto rounded-2xl border-2 border-black shadow-sm 
                focus-within:ring-1 focus-within:ring-black/70 bg-[#FCF5E2] overflow-hidden'
            >
                <textarea
                    ref={ref}
                    rows={minRows}
                    onChange={handleChange}
                    value={value}
                    className={`w-full bg-transparent px-4 py-3 outline-none placeholder:text-gray-400 resize-none ${className ?? ""}`}
                    {...props}
                />
            </div>
        </div>

    )
} 