interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
  }

export function PrimaryButton({children, ...props}:ButtonProps) {
    return(
        <button
            className="block w-80 mx-auto rounded-2xl px-4 py-3 bg-[#FFEDAD] text-black disabled:opacity-50 disabled:cursor-not-allowed"
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