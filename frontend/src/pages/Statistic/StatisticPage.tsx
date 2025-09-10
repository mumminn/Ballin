import { useEffect, useMemo, useState } from "react";
import StatisticForm from "./StatisticForm";
import type { FilterValue } from "@/components/statistic/FilterBottomSheet";
import type { Sport } from "@/types/calendar";
import { getStatistic } from "@/api/statistic/statistic";
import type { StatisticRequest, StatisticResponse } from "@/types/statistic";


const sportToCategory = (s: Sport | null): StatisticRequest["category"] =>
  s === null ? "All" : s;

export default function StatisticPage() {
  const [tab, setTab] = useState<string>("text");

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

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [stat, setStat] = useState<StatisticResponse | null>(null);

  useEffect(() => {
    const fetchStat = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const body: StatisticRequest = {
          category: sportToCategory(filter.sport),
          startDate: filter.startDate,
          endDate: filter.endDate,
        };
        const data = await getStatistic(body);
        setStat(data ?? null);
      } catch (e: any) {
        setErrorMsg(e?.message ?? "통계를 불러오지 못했습니다.");
        setStat(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStat();
  }, [filter]);

  const { win, loss, draw, totalGames, winRate } = useMemo(() => {
    const w = stat?.winCount ?? 0;
    const l = stat?.lossCount ?? 0;
    const d = stat?.tieCount ?? 0;
    const t = w + l + d;
    const r = t ? w / t : 0;
    return { win: w, loss: l, draw: d, totalGames: t, winRate: r };
  }, [stat]);

  return (
    <StatisticForm
      tab={tab}
      onChangeTab={setTab}
      sheetOpen={sheetOpen}
      filter={filter}
      onOpenSheet={() => setSheetOpen(true)}
      onCloseSheet={() => setSheetOpen(false)}
      onApplyFilter={(next) => {
        setFilter(next);
        setSheetOpen(false);
      }}
      onResetFilter={() => {
        const today = new Date();
        const y = today.getFullYear();
        setFilter({
          startDate: `${y}-01-01`,
          endDate: today.toISOString().slice(0, 10),
          sport: null,
          season: "",
        });
      }}
      
      win={win}
      loss={loss}
      draw={draw}
      totalGames={totalGames}
      winRate={winRate}
      mostVisitedStadium={stat?.mostVisitedStadium ?? null}
      bestWinStadium={stat?.bestWinRateStadium ?? null}
      loading={loading}
      errorMsg={errorMsg}
    />
  );
}