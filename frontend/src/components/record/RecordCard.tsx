// RecordCard.tsx (변경된 부분 포함 전체 예시)
import { Sport, Result } from "@/types/calendar";
import { TEAM_COLORS } from "@/types/team-color";

export type Stamp =
  | { result: Result }
  | { result: Result; sport: Sport; team: string };

interface RecordCardProps extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
  date?: string;
  myTeam?: string;
  opponentTeam?: string;
  stadium?: string;
  className?: string;
  stamp?: Stamp;
  homeTeam?: string;
}

const stampPath = (s: Stamp) =>
  "team" in s ? `/images/stamps/${s.team}_${s.result}.png` : `/images/stamps/${s.result}.png`;

export function RecordCard({
  containerClassName,
  date,
  myTeam,
  opponentTeam,
  stadium,
  className,
  stamp,
  homeTeam,
  onClick,
}: RecordCardProps) {
  const [leftName, rightName] = (() => {
    const a = myTeam ?? "";
    const b = opponentTeam ?? "";
    if (!homeTeam) return [a, b];
    if (a === homeTeam && b !== homeTeam) return [b, a];
    if (b === homeTeam && a !== homeTeam) return [a, b];
    return [a, b];
  })();

  return (
    <div className={containerClassName ?? ""}>
      <div
        className={`relative overflow-visible w-88 h-32 mx-auto rounded-2xl border-2 border-black bg-[#FCF5E2] ${className ?? ""}`}
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        {date && (
          <div className="absolute left-4 top-2 text-[14px] font-light tracking-wide">
            {date}
          </div>
        )}

        <div className={`flex h-full flex-col items-center justify-center px-5 pt-3`}>
          <div className="flex items-baseline gap-2">
            <span
              className="text-[var(--team-color)] font-bold text-lg leading-none"
              style={{ ["--team-color" as any]: TEAM_COLORS[leftName] ?? "#000000" }}
            >
              {leftName ?? ""}
            </span>
            <span className="font-semibold leading-none">VS</span>
            <span
              className="text-[var(--team-color)] font-bold text-lg leading-none"
              style={{ ["--team-color" as any]: TEAM_COLORS[rightName] ?? "#000000" }}
            >
              {rightName ?? ""}
            </span>
          </div>

          {stadium && (
            <div className="mt-3 text-[13px] font-light text-gray-900">{stadium}</div>
          )}
        </div>

        {stamp && (
            <img
                src={stampPath(stamp)}
                alt={`결과 스탬프: ${stamp.result}`}
                className="absolute -right-4 -bottom-6 w-[100px] h-[100px]
                object-contain pointer-events-none select-none z-10 mix-blend-multiply opacity-95"
            />
        )}
      </div>
    </div>
  );
}