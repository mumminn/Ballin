type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({children, ...props}:ButtonProps) {
    return(
        <button
            className="w-full rounded-md px-4 py-2 bg-[#FFEDAD] text-black disabled:opacity-50 disabled:cursor-not-allowed"
                {...props}
            > 
                {children}
        </button>
    );
}