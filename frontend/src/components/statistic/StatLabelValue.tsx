import React from "react";

interface StatLabelValueProps {
  label: React.ReactNode;
  value: React.ReactNode;
  className?: string;
}

export function StatLabelValue({ label, value, className }: StatLabelValueProps) {
  return (
    <div className={`text-center ${className ?? ""}`}>
      <p className="text-[18px] font-semibold text-[#4F8A78]">{label}</p>
      <p className="mt-2 text-[18px] font-extrabold text-black">{value}</p>
    </div>
  );
}