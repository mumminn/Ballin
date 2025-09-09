import { useEffect, useMemo, useRef, useState } from "react";
import type { Sport } from "@/types/calendar";
import { InputField } from "@/components/common/InputField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SeasonItem } from "@/types/statistic";
import { getSeason } from "@/api/statistic/getSeason";

export interface FilterValue {
  startDate: string;
  endDate: string;
  sport: Sport | null ;
  season: string;
}

interface Props {
  open: boolean;
  value: FilterValue;
  onClose: () => void;
  onApply: (next: FilterValue) => void;
  onReset?: () => void;
}

export default function FilterBottomSheet({
  open,
  value,
  onClose,
  onApply,
  onReset,
}: Props) {
    const [startDate, setStartDate] = useState(value.startDate);
    const [endDate, setEndDate] = useState(value.endDate);
    const [sport, setSport] = useState<Sport | null>(value.sport);
    const [season, setSeason] = useState<string>(value.season);

    const [seasonOpen, setSeasonOpen] = useState(false);
    const seasonWrapRef = useRef<HTMLDivElement | null>(null);

    const [seasons, setSeasons] = useState<SeasonItem[]>([]);

    useEffect(() => {
        if (!open) return;
        setStartDate(value.startDate);
        setEndDate(value.endDate);
        setSport(value.sport ?? null);
        setSeason(value.season);
        setSeasonOpen(false);
    }, [open, value]);

    useEffect(() => {
      if(!open) return;
      if (seasons.length > 0) return;
      (async () => {
        const list = await getSeason();
        setSeasons(list ?? []);
      })();
    }, [open, seasons.length]);

    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (!seasonWrapRef.current) return;
            if (!seasonWrapRef.current.contains(e.target as Node)) setSeasonOpen(false);
        };
        if (seasonOpen) document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [seasonOpen]);

    const basketballSeasons = useMemo(
      () =>
        seasons
          .filter((s) => s.category === "basketball")
          .sort((a, b) => a.seasonName.localeCompare(b.seasonName)).reverse(),
      [seasons]
    );
    
    const baseballSeasons = useMemo(
      () =>
        seasons
          .filter((s) => s.category === "baseball")
          .sort((a, b) => a.seasonName.localeCompare(b.seasonName)).reverse(),
      [seasons]
    );
    
    const applySeasonItem = (item: SeasonItem) => {
      setSport(item.category as Sport);
      setSeason(item.seasonName);
      setStartDate(item.startDate);
      setEndDate(item.endDate);
    };

    const handleApply = () => onApply({ startDate, endDate, sport, season });

    const handleReset = () => {
        if (onReset) onReset();
        const today = new Date();
        const y = today.getFullYear();
        setSeason("");
        setSport(null);
        setStartDate(`${y}-01-01`);
        setEndDate(today.toISOString().slice(0, 10));
    };

    const SHEET_BG = "#FFF7DD";

    return (
        <>
          <div
            className={`absolute inset-0 z-[1000] bg-black/40 transition-opacity duration-300 ${
              open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={onClose}
          />
    
          <div
            className={`absolute left-1/2 -translate-x-1/2 bottom-0 z-[1001] w-full max-w-[480px]
                        transition-transform duration-300 ${
                          open ? "translate-y-0" : "translate-y-full"
                        }`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="rounded-t-3xl shadow-xl pb-[env(safe-area-inset-bottom)] px-5 pt-5
                         overflow-y-auto max-h-[85vh]"
              style={{ backgroundColor: SHEET_BG }}
            >
              {/* 헤더 */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold">필터</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5"
                  aria-label="닫기"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>
    
              {/* 기간 */}
              <div className="mt-1">
                <p className="text-lg font-semibold text-[#4F8A78] mb-3">기간</p>
    
                {/* 시작일 */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-base font-semibold">시작일</span>
                  <div className="relative">
                    <InputField
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      sizeVariant="half"
                      align="right"
                      className="bg-[#FFF7DD]"
                    />
                  </div>
                </div>
    
                {/* 종료일 */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-base font-semibold">종료일</span>
                  <div className="relative">
                    <InputField
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      sizeVariant="half"
                      align="right"
                      className="bg-[#FFF7DD]"
                    />
                  </div>
                </div>
              </div>
    
              {/* 종목 */}
              <div className="mt-7">
                <p className="text-lg font-semibold text-[#4F8A78] mb-3">종목</p>
                <div className="grid grid-cols-2 gap-3">
                  <PrimaryButton
                    sizeVariant="half"
                    onClick={() => setSport("basketball")}
                    className={`font-semibold border-2 ${
                        sport === "basketball" ? "border-black" : "border-transparent"
                      }`}
                    >
                    농구
                  </PrimaryButton>
    
                  <PrimaryButton
                    sizeVariant="half"
                    onClick={() => setSport("baseball")}
                    className={`font-semibold border-2 ${
                        sport === "baseball" ? "border-black" : "border-transparent"
                      }`}
                    >
                    야구
                  </PrimaryButton>
                </div>
              </div>
    
              {/* 시즌 드롭다운 */}
              <div className="mt-7 space-y-2 relative" ref={seasonWrapRef}>
                <div className="flex items-baseline gap-3">
                  <p className="text-lg font-semibold text-[#4F8A78]">시즌</p>
                  <p className="text-sm text-gray-600">시즌 선택시 종목, 기간은 자동 설정됩니다.</p>
                </div>
    
                <button
                  type="button"
                  onClick={() => setSeasonOpen((v) => !v)}
                  className="relative w-full h-12 rounded-2xl border-2 border-black bg-[#FFF7DD] px-3 pr-10 text-left"
                >
                  {season || "선택하세요"}
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2">
                    expand_more
                  </span>
                </button>
    
                <div
                  className={`absolute left-0 right-0 mt-0 rounded-2xl border-2 border-black shadow-lg transition
                    ${seasonOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}
                  style={{ backgroundColor: SHEET_BG }}
                >
                  <div className="px-4 pt-3 pb-2 border-b border-black/30">
                    <p className="text-base font-semibold mb-2">농구</p>
                    <ul className="space-y-2">
                      {basketballSeasons.map((item) => (
                        <li key={`${item.category}-${item.seasonName}`}>
                          <button
                            type="button"
                            className="w-full text-center py-2 rounded-lg hover:bg-black/5"
                            onClick={() => {
                              applySeasonItem(item);
                              setSeasonOpen(false);
                            }}
                          >
                            {item.seasonName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
    
                  <div className="px-4 pt-3 pb-3">
                    <p className="text-base font-semibold mb-2">야구</p>
                    <ul className="space-y-2">
                      {baseballSeasons.map((item) => (
                        <li key={`${item.category}-${item.seasonName}`}>
                          <button
                            type="button"
                            className="w-full text-center py-2 rounded-lg hover:bg-black/5"
                            onClick={() => {
                              applySeasonItem(item);
                              setSeasonOpen(false);
                            }}
                          >
                            {item.seasonName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
    
              <p className="mt-5 ml-3 text-sm text-gray-600">
                초기화 시 올해 기준으로 전체 승률 데이터를 보여줍니다.
              </p>
    
              {/* 하단 버튼 */}
              <div className="mt-4 grid grid-cols-2 gap-3 pb-2">
                <PrimaryButton sizeVariant="half" onClick={handleReset}>
                  초기화
                </PrimaryButton>
                <PrimaryButton sizeVariant="half" onClick={handleApply}>
                  적용
                </PrimaryButton>
              </div>
            </div>
          </div>
        </>
      );
    }