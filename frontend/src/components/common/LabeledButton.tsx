import React from "react";

type Size = "full" | "half";
type Align = "left" | "center" | "right";

function widthClassOf(size: Size) {
  return size === "half" ? "w-40" : "w-80";
}
function alignClassOf(align: Align) {
  return align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : "";
}

interface LabeledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  containerClassName?: string;
  sizeVariant?: Size;
  align?: Align;
}

export function LabeledButton({
  label,
  containerClassName,
  sizeVariant = "full",
  align = "center",
  className,
  children,
  ...props
}: LabeledButtonProps) {
  const widthClass = widthClassOf(sizeVariant);
  const alignClass = alignClassOf(align);

  return (
    <div className={`space-y-2 ${containerClassName ?? ""}`}>
      {label && (
        <label className={`block ${widthClass} ${alignClass} text-lg font-semibold text-gray-900`}>
          {label}
        </label>
      )}
      <button
        className={`block ${widthClass} ${alignClass} rounded-2xl border-2 border-black bg-[#FCF5E2] px-4 py-3
                    hover:bg-black/5 active:scale-[0.99] transition ${className ?? ""}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}