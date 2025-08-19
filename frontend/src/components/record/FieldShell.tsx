import React from 'react';
interface FieldShellProps {
  date?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  minH?: number | string;
};
export function FieldShell({ 
    date, 
    children, 
    className = '',
    minH = 52,
 }: FieldShellProps) {
    const minHeight =
    typeof minH === 'number' ? `${minH}px` : minH;









    return (
        <div className="space-y-2 mx-auto w-80">
        {date && (
            <div className="text-lg text-gray-900 text-right">{date}</div>
        )}
        <div className={`rounded-2xl border-2 border-black bg-[#FCF5E2] px-5 py-3 ${className}`}
            style={{ minHeight }}>
            {children}
        </div>
        </div>
    );
}