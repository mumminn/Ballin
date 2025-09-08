interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
  }
  
  export function FilterButton({ className, ...props }: FilterButtonProps) {
    return (
      <button
        type="button"
        {...props}
        className={`inline-flex items-center justify-center rounded-full p-2 ${className ?? ""}`}
        aria-label="필터"
      >
        <span className="material-symbols-outlined text-[20px] leading-none translate-y-[1px]">
          tune
        </span>
      </button>
    );
  }