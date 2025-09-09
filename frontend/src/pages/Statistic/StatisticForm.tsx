import { useState } from "react";
import { SegmentToggle } from "@/components/common/SegmentToggle";
import { SubLayout } from "@/components/layout/SubLayout";
import { NavigationBar } from "@/components/navigationBar/NavigationBar";
import { FilterButton } from "@/components/statistic/FilterButton";
import FilterBottomSheet, { FilterValue } from "@/components/statistic/FilterBottomSheet";
import { StatLabelValue } from "@/components/statistic/StatLabelValue";
import StatePie from "@/components/statistic/StatPie";

interface StatisticProps {
    tab: string;
    setTab: (next: string) => void;
}

const fmt = (d: string) => d.replaceAll("-", ".");
const imgFor = (sport: FilterValue["sport"]) => {
    switch (sport) {
      case "basketball":
        return { src: "/images/basketball_character.svg", alt: "농구 일러스트" };
      case "baseball":
        return { src: "/images/baseball_character.svg", alt: "야구 일러스트" };
      default:
        return { src: "/images/mascot-both.svg", alt: "농구/야구 일러스트" };
    }
  };

export default function StatisticForm({
    tab,
    setTab,
}: StatisticProps) {
    const [sheetOpen, setSheetOpen] = useState(false);

    const [filter, setFilter] = useState<FilterValue>(() => {
        const today = new Date();
        const y = today.getFullYear();
        return {
          startDate: `${y}-01-01`,
          endDate: today.toISOString().slice(0, 10),
          sport: null,
          season: "",
        };
    });


    const win = 3, loss = 2, draw = 1;
    const total = win + loss + draw;
    const winRate = total ? win / total : 0;
    const stats = {
        totalGames: 3,
        winRate: 0.25,
        mostVisitedStadium: "잠실야구장",
        bestWinStadium: "광주기아챔피언스필드",
    };

    const title = filter.season && filter.season.trim().length > 0
    ? filter.season
    : `${fmt(filter.startDate)} ~ ${fmt(filter.endDate)}`;
  
    const illust = imgFor(filter.sport);

      return (
        <SubLayout
          header={
            <div className="flex items-center justify-between w-full">
              <p className="text-2xl">통계</p>
              <FilterButton
                onClick={() => setSheetOpen(true)}
                className="p-2 rounded-lg hover:bg-black/5"
                aria-label="필터 열기"
              >
              </FilterButton>
            </div>
          }
          footer={<NavigationBar />}
          barHeight={56}
          maxWidth={480}
        >
        <SegmentToggle
            options={[
              { label: "텍스트", value: "text" },
              { label: "차트", value: "chart" },
            ]}
            value={tab}
            onChange={setTab}
            size="md"
            className="mt-6"
        />
    
        <section className="mt-12 text-center">
            <p className="text-[28px] font-extrabold tracking-tight">{title}</p>
        </section>


        { tab === "chart" ? (
          <>
            <section className="mt-2">
              <StatePie win={win} loss={loss} draw={draw} />
            </section>

            <section className="mt-7 mb-2 text-center">
              <p className="text-2xl font-extrabold">
                {total}전 {win}승 {loss}패 {draw}무
              </p>
            </section>
          </>
        ): (
          <>
            <section className="mt-6 flex justify-center">
                <img
                src={illust.src}
                alt={illust.alt}
                className="w-[220px] h-auto select-none pointer-events-none"
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                />
            </section>

            <section className="mt-4 grid grid-cols-2 gap-6">
                <StatLabelValue label="총 직관 경기수" value={`${stats.totalGames} 경기`} />
                <StatLabelValue label="직관 승리 비율" value={`${Math.round(stats.winRate * 100)}%`} />
            </section>

            <section className="mt-8">
                <StatLabelValue label="가장 많이 방문한 경기장" value={stats.mostVisitedStadium} />
            </section>

            <section className="mt-8 mb-4">
                <StatLabelValue label="가장 승률이 높은 경기장" value={stats.bestWinStadium} />
            </section>
          </>
        )}

          <FilterBottomSheet
            open={sheetOpen}
            value={filter}
            onClose={() => setSheetOpen(false)}
            onApply={(next) => {
              setFilter(next);
              setSheetOpen(false);
            }}
            onReset={() => {
              const today = new Date();
              const y = today.getFullYear();
              setFilter({
                startDate: `${y}-01-01`,
                endDate: today.toISOString().slice(0, 10),
                sport: null,
                season: "",
              });
            }}
          />
        </SubLayout>
      );
}