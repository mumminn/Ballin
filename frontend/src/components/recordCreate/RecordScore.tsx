interface RecordScoreProps {
    myScore: string | number;
    opponentScore: string | number;
    onChange?: (next: {myScore: string; opponentScore: string }) => void;

    containerClassName?: string;
    readOnly?: boolean;
    error?: string;
}

export function RecordScore({
    myScore,
    opponentScore,
    onChange,
    containerClassName,
    readOnly,
}: RecordScoreProps) {

    const handleMy = (v: string) =>
        onChange?.({
          myScore: v.replace(/[^\d]/g, ""),
          opponentScore: String(opponentScore ?? ""),
        });

    const handleOpp = (v: string) =>
        onChange?.({
            myScore: String(myScore ?? ""),
            opponentScore: v.replace(/[^\d]/g, ""),
        });
    return (
        <div className={`space-y-2 ${containerClassName ?? ""}`}>
            <div className='flex items-baseline gap-2 mx-auto w-80'>
                <label className='text-lg font-semibold text-gray-900'>경기결과</label>
                <span className='text-sm text-gray-500'>점수는 응원 팀이 앞에 표시됩니다.</span>
            </div>
            <div
                className='relative mx-auto w-80 rounded-2xl border-2 border-black shadow-sm
                focus-within:ring-1 focus-within:ring-black/70 bg-[#FCF5E2]'
            >
                <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3">
                <input
                    inputMode="numeric"
                    className="w-full bg-transparent text-lg text-center outline-none"
                    value={myScore ?? ""}
                    onChange={(e) => handleMy(e.target.value)}
                    readOnly={readOnly}
                    aria-label="응원팀 점수"
                />
                <span className="px-3 select-none text-lg font-semibold">:</span>
                <input
                    inputMode="numeric"
                    className="w-full bg-transparent text-lg text-center outline-none"
                    value={opponentScore ?? ""}
                    onChange={(e) => handleOpp(e.target.value)}
                    readOnly={readOnly}
                    aria-label="상대팀 점수"
                />
                </div>
            </div>

        </div>


    )
}