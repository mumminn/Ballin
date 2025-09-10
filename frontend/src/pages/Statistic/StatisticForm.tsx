import { useState } from "react";
import { SegmentToggle } from "@/components/common/SegmentToggle";
import { SubLayout } from "@/components/layout/SubLayout";
import { NavigationBar } from "@/components/navigationBar/NavigationBar";
import { FilterButton } from "@/components/statistic/FilterButton";
import FilterBottomSheet, { FilterValue } from "@/components/statistic/FilterBottomSheet";
import { StatLabelValue } from "@/components/statistic/StatLabelValue";
import StatePie from "@/components/statistic/StatPie";

interface StatisticFormProps {
    tab: string;
    onChangeTab: (next: string) => void;

    sheetOpen: boolean;
    filter: FilterValue;
    onOpenSheet: () => void;
    onCloseSheet: () => void;
    onApplyFilter: (next: FilterValue) => void;
    onResetFilter: () => void;


    win: number;
    loss: number;
    draw: number;
    totalGames: number;
    winRate: number;
    mostVisitedStadium: string | null;
    bestWinStadium: string | null;

    loading?: boolean;
    errorMsg?: string | null;
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
  onChangeTab,

  sheetOpen,
  filter,
  onOpenSheet,
  onCloseSheet,
  onApplyFilter,
  onResetFilter,

  win,
  loss,
  draw,
  totalGames,
  winRate,
  mostVisitedStadium,
  bestWinStadium,

  loading = false,
  errorMsg = null,
}: StatisticFormProps) {
  const title =
    filter.season && filter.season.trim().length > 0
      ? filter.season
      : `${fmt(filter.startDate)} ~ ${fmt(filter.endDate)}`;

  const illust = imgFor(filter.sport);

  return (
    <SubLayout
      header={
        <div className="flex items-center justify-between w-full">
          <p className="text-2xl">통계</p>
          <FilterButton
            onClick={onOpenSheet}
            className="p-2 rounded-lg hover:bg-black/5"
            aria-label="필터 열기"
          />
        </div>
      }
      footer={<NavigationBar />}
      barHeight={56}
      maxWidth={480}
    >
    <div className="w-full max-w-[480px] mx-auto min-h-dvh overflow-y-auto pb-[88px]">
    
      <SegmentToggle
        options={[
          { label: "텍스트", value: "text" },
          { label: "차트", value: "chart" },
        ]}
        value={tab}
        onChange={onChangeTab}
        size="md"
        className="mt-6"
      />

      <section className="mt-8 text-center">
        <p className="text-[25px] font-extrabold tracking-tight">{title}</p>
      </section>

      {loading ? (
        <div className="mt-10 text-center text-gray-500">불러오는 중…</div>
      ) : errorMsg ? (
        <div className="mt-10 text-center text-red-500">{errorMsg}</div>
      ) : tab === "chart" ? (
        <>
          <section className="mt-2">
            <StatePie win={win} loss={loss} draw={draw} />
          </section>

          <section className="mt-7 mb-2 text-center">
            <p className="text-2xl font-extrabold">
              {totalGames}전 {win}승 {loss}패 {draw}무
            </p>
          </section>
        </>
      ) : (
        <>
          <section className="mt-3 flex justify-center">
            <img
              src={illust.src}
              alt={illust.alt}
              className="w-[200px] h-auto select-none pointer-events-none"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </section>

          <section className="mt-4 grid grid-cols-2 gap-6">
            <StatLabelValue label="총 직관 경기수" value={`${totalGames} 경기`} />
            <StatLabelValue label="직관 승리 비율" value={`${Math.round(winRate * 100)}%`} />
          </section>

          <section className="mt-8">
            <StatLabelValue
              label="가장 많이 방문한 경기장"
              value={mostVisitedStadium ?? "-"}
            />
          </section>

          <section className="mt-8 mb-4">
            <StatLabelValue
              label="가장 승률이 높은 경기장"
              value={bestWinStadium ?? "-"}
            />
          </section>
        </>
      )}

      <p className="mt-8 text-center text-xs text-gray-500">
        'No Game' 경기는 포함되지 않습니다.
      </p>

      <FilterBottomSheet
        open={sheetOpen}
        value={filter}
        onClose={onCloseSheet}
        onApply={onApplyFilter}
        onReset={onResetFilter}
      />
    </div>

    </SubLayout>
  );
}