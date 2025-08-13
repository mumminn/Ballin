import React from "react";
import { DayPicker, type DayProps } from "react-day-picker";
import { ko } from "date-fns/locale";
import { addMonths, format } from "date-fns";
import "react-day-picker/style.css";
import { Stamp } from "types/calendar";
import { Tab } from "types/calendar";


type Props = {
    stamps?: Stamp[];
    filter?: Tab;
  };

export default function Calendar({
        stamps = [],
        filter='all',
    }: Props) {

        const [month, setMonth] = React.useState(new Date());

        const key = (d: Date) => format(d, "yyyy-MM-dd");

        const stampsByDay = React.useMemo(() => {
            const m = new Map<string, Stamp[]>();
            for (const s of stamps) {
            const k = key(s.date);
            if (!m.has(k)) m.set(k, []);
            m.get(k)!.push(s);
            }
            return m;
        }, [stamps]);

        const stampPath = (s: Stamp) =>
            "team" in s
            ? `/images/stamps/calendar/${s.sport}/cal_${s.team}_${s.result}.png`
            : `/images/stamps/calendar/${s.result}.png`;
        

        const goPrev = () => setMonth((m) => addMonths(m, -1));
        const goNext = () => setMonth((m) => addMonths(m, 1));


    return (
        <div className="w-[400px] rounded-2xl p-4">
        {/* 커스텀 헤더: 좌우 화살표 + 가운데 년월 */}
            <div className="mb-3 flex w-full justify-center">
                <div className="inline-flex items-center gap-3 mt-8 mb-3">
                    <button
                    onClick={goPrev}
                    className="grid place-items-center w-12 h-12 text-3xl rounded-full transition-colors"
                    aria-label="이전 달"
                    >
                    ‹
                    </button>

                    <div className="text-[25px] font-extrabold text-center">
                    {format(month, "yyyy년 M월", { locale: ko })}
                    </div>

                    <button
                    onClick={goNext}
                    className="grid place-items-center w-12 h-12 text-3xl rounded-full transition-colors"
                    aria-label="다음 달"
                    >
                    ›
                    </button>
                </div>
            </div>

        <DayPicker
            month={month}
            onMonthChange={setMonth}
            locale={ko}
            showOutsideDays
            weekStartsOn={0}
            hideNavigation

            classNames={{
            root: "w-full flex flex-col items-center",
            nav: "hidden",
            caption: "hidden",

            months: "relative flex justify-center",
            month: "w-full",

            weekdays: "grid grid-cols-7",
            weekday: "text-center py-2 tracking-tight mt-2 mb-2 mx-3 text-[22px]",

            weeks: "grid gap-1",
            week: "grid grid-cols-7 text-[28px] mt-2 mb-2 text-black/70",

            day: "relative flex items-center justify-center",
            day_button: "w-[54px] h-[54px] rounded-full flex items-center justify-center text-lg",
            outside: "opacity-40",
            selected: "bg-[#4d7e73] text-white",

            }}
            formatters={{
            formatCaption: (m, opts) => format(m, "yyyy년 M월", opts),
            formatWeekdayName: (d, opts) => format(d, "E", opts),
            }}
            components={{
                MonthCaption: () => <></>,
                Nav: () => <></>,
                Day: (props: DayProps) => {
                    const d = props.day.date;
                    const all = d ? stampsByDay.get(key(d)) ?? [] : [];
                    const show = filter === "all" ? all : all.filter((s) => s.sport === filter);
    

                    return (
                        <div className={`relative ${props.className ?? ""}`}>
                            {props.children}
                            {show.length > 0 && (
                            <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none select-none">
                                {show.slice(0, 2).map((s, i) => (
                                <img
                                    key={i}
                                    src={stampPath(s)}
                                    alt={`${s.result}${"team" in s ? ` ${s.team}` : ""}`}
                                    draggable={false}
                                />
                                ))}
                        </div>
                )}
              </div>
                    );
                },
            }}
        />
        </div>
    );
    }