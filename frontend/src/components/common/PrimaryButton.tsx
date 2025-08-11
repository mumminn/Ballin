type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({children, ...props}:ButtonProps) {
    return(
        <button
            className="w-full rounded-2xl px-4 py-3 bg-[#FFEDAD] text-black disabled:opacity-50 disabled:cursor-not-allowed"
                {...props}
            > 
                {children}
        </button>
    );
}