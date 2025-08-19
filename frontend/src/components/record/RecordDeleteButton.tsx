interface RecordDeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
}

export function RecordDeleteButton ({
    className
}: RecordDeleteButtonProps) {
    return(
        <button className={`${className}`}>
            <button className="material-symbols-outlined text-[20px] leading-none translate-y-[1px]">delete</button>
        </button>
    )
}