import { TeamOption } from "@/types/record";

interface TeamSelectProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  options: TeamOption[];
  containerClassName?: string;
}

export function TeamSelect({
  label,
  value,
  onChange,
  options,
  containerClassName,
}: TeamSelectProps) {
  return (
    <div className={`space-y-2 ${containerClassName ?? ""}`}>
      <div className="flex items-baseline gap-2 mx-auto w-80">
        {label && (
          <label htmlFor="teamSelect" className="text-lg font-semibold text-gray-900">
            {label}
          </label>
        )}
      </div>

      <div className="relative mx-auto w-80 rounded-2xl border-2 border-black shadow-sm
                      focus-within:ring-1 focus-within:ring-black/70 bg-[#FCF5E2]">
        <select
          id="teamSelect"
          name="team"
          className="w-full bg-transparent text-lg outline-none px-4 py-3 appearance-none"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            팀을 선택하세요
          </option>
          {options.map((opt) => (
            <option key={opt.teamId} value={opt.teamName}>
              {opt.teamName}
            </option>
          ))}
        </select>

        
        <span
          className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[20px] opacity-70"
          aria-hidden="true"
        >
          expand_more
        </span>
      </div>
    </div>
  );
}