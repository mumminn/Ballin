import * as React from "react";

interface RecordSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  containerClassName?: string;
  icon?: React.ReactNode;
}

export function RecordSearch({
  containerClassName,
  className,
  icon = <span className="material-symbols-outlined text-[20px] leading-none translate-y-[1px]">search</span>,
  type = "search",
  ...props
}: RecordSearchProps) {
  return (
    <div className={containerClassName ?? ""}>
      <div
        className="block w-88 mx-auto rounded-2xl border-2 border-black
                   shadow-sm focus-within:ring-1 focus-within:ring-black/70
                   bg-[#FCF5E2] flex items-center"
      >
        <span
          className="ml-3 mr-2 h-6 w- flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          {icon}
        </span>

        <input
          type={type}
          className={`flex-1 bg-transparent py-3 pr-4 outline-none
                      placeholder:text-gray-700 ${className ?? ""}`}
          {...props}
        />
      </div>
    </div>
  );
}