interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    primaryButtonClassName?: string;
    children: React.ReactNode;
    sizeVariant?: 'full' | 'half';
    align?: 'left' | 'center' | 'right';
  }

export function PrimaryButton({
    children, 
    primaryButtonClassName, 
    sizeVariant = 'full',
    align = 'center',
    ...props
}:ButtonProps) {

    const widthClass = sizeVariant === 'half' ? 'w-40' : 'w-80';
    const alignClass = align === 'center' ? 'mx-auto'
    : align === 'right' ? 'ml-auto'
    : '';

    return(
        <button
            className={`block ${widthClass} ${alignClass} rounded-2xl px-4 py-3 bg-[#FFEDAD] text-black disabled:opacity-50 disabled:cursor-not-allowed ${primaryButtonClassName ?? ''}`}
                {...props}
            > 
                {children}
        </button>
    );
}

// 사용 예
{/* <PrimaryButton type="submit" onClick={() => alert('가입')}>
  회원가입
</PrimaryButton> */}