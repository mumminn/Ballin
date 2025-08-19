import React, { useEffect, useRef } from 'react';

type Props = {
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  minRows?: number;
  lineHeight?: number;
  className?: string;
  placeholder?: string;
};

export function ReviewLined({
  value,
  onChange,
  readOnly = true,
  minRows = 5,
  lineHeight = 32,
  className = '',
  placeholder,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value, minRows]);

  return (
    <textarea
      ref={ref}
      rows={minRows}
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className={`w-full resize-none bg-transparent outline-none p-0 font-semibold ${className}`}
      style={{
        lineHeight: `${lineHeight}px`,
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          transparent,
          transparent ${lineHeight - 2}px,
          #000 ${lineHeight - 2}px,
          #000 ${lineHeight}px
        )`,
        backgroundPosition: 'left top',
      }}
    />
  );
}