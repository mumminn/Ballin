interface RecordEditButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
}

export function RecordEditButton ({
    className,
    onClick,
}: RecordEditButtonProps) {
    return(
        <button className={`${className}`}>
            <button className="material-symbols-outlined text-[20px] leading-none translate-y-[1px]" onClick={onClick}>edit</button>
        </button>
    )
}