import { Sport, Result } from "types/calendar";

export type Stamp = 
    | {result: Result}
    | {result: Result; sport: Sport; team: string}

interface RecordCardProps extends React.HTMLAttributes<HTMLDivElement>{
    containerClassName?: string;
    date?: string;
    myTeam?: string;
    opponentTeam?: string;
    stadium?: string;
    className?: string;
    stamp?: Stamp;
}

const stampPath = (s: Stamp) => 
    "team" in s
    ? `/images/stamps/${s.sport}/${s.team}_${s.result}.png`
    : `/images/stamps/${s.result}.png`;

export function RecordCard({
    containerClassName,
    date,
    myTeam,
    opponentTeam,
    stadium,
    className,
    stamp,
    onClick,
}: RecordCardProps) {
    const contentRightPad = stamp ? "pr-20" : "pr-5";
    
    return (
        <div className={containerClassName ?? ""}>
          <div
            className={`relative w-80 h-32 mx-auto rounded-2xl border-2 border-black bg-[#FCF5E2] ${className ?? ""}`}
            role="button"
            tabIndex={0}
            onClick={onClick}
        >
            {date && (
                <div className="absolute left-4 top-2 text-[14px] font-semibold tracking-wide">
                    {date}
                </div>
            )}

            <div className={`flex h-full flex-col items-center justify-center px-5 pt-3 ${contentRightPad}`}>
                <div className="flex items-baseline gap-2">
                    <span className="text-red-600 font-extrabold text-lg leading-none">
                    {myTeam ?? ""}
                    </span>
                    <span className="font-semibold leading-none">VS</span>
                    <span className="text-orange-400 font-extrabold text-lg leading-none">
                    {opponentTeam ?? ""}
                    </span>
                </div>
                {stadium && (
                    <div className="mt-3 text-[13px] font-semibold">
                    {stadium}
                    </div>
                )}
                </div>

                {stamp && (
                <img
                    src={stampPath(stamp)}
                    alt={`결과 스탬프: ${stamp.result}`}
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-[73px] object-contain pointer-events-none select-none"
                />
                )}
          </div>
        </div>
      );
}