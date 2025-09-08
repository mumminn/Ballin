interface RecordDeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    onClick?: () => void;
}

export function RecordDeleteButton ({
    className,
    onClick
}: RecordDeleteButtonProps) {
    return(
        <button className={`${className}`}>
            <button 
                className="material-symbols-outlined text-[20px] leading-none translate-y-[1px]"
                onClick={onClick}
            >
                delete
            </button>
        </button>
    )
}