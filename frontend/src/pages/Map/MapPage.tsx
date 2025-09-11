import { useEffect, useMemo, useState } from "react";
import type { Sport } from "@/types/calendar";
import { MapForm, UIPin } from "./MapForm";

type Pin = {
    id: string;
    logo: string;
    x: number;
    y: number;
    size?: number;
  };

const logoOf = (teamCode: string) => `/images/logos/${teamCode}.svg`;

const makePin = (
    id: string,
    x: number,
    y: number,
    overrides: Partial<Pin> = {}
  ): Pin => ({
    id,
    logo: logoOf(id),
    x,
    y,
    ...overrides,
  });
  

  const BASKETBALL_PINS: Pin[] = [
    makePin("seoul-sk", 28, 20, { size: 42 }),
    makePin("seoul-samsung", 42, 20, { size: 57 }),
    makePin("goyang-sono", 24, 15, { size: 38 }),
    makePin("anyang-jungkwanjang", 27, 26, { size: 35 }),
    makePin("suwon-kt", 38, 27),
    makePin("wonju-db", 57, 24, { size: 42 }),
    makePin("daegu-kogas", 60, 54, { size: 66 }),
    makePin("ulsan-hyundai-mobis", 86, 66),
    makePin("busan-kcc", 76, 72, { size: 58 }),
    makePin("changwon-lg", 63, 72, { size: 55 }),
  ];

  const BASEBALL_PINS: Pin[] = [
    makePin("kiwoom-heroes", 26, 20, { size: 42 }),
    makePin("doosan-bears", 33, 22, { size: 42 }),
    makePin("lg-twins", 38, 19, { size: 42 }),
    makePin("ssg-landers", 18, 24),
    makePin("kt-wiz", 30, 28, { size: 40 }),
    makePin("hanwha-eagles", 43, 43, { size: 40 }),
    makePin("samsung-lions", 66, 58, { size: 40 }),
    makePin("kia-tigers", 19, 74, { size: 40 }),
    makePin("lotte-giants", 82, 73, { size: 42 }),
    makePin("nc-dinos", 70, 72),
  ];



async function fetchVisitedTeamIds(category: Sport): Promise<string[]> {
  // const { data } = await api.get<ApiResponse<string[]>>("/api/maps/visited", { params:{ category }});
  // return data.result ?? [];
  if (category === "basketball") return ["kbl-seoul-sk", "kbl-busan-kt"];
  return ["kbo-ssg", "kbo-kia", "kbo-samsung"];
}

export default function MapPage() {
  const [tab, setTab] = useState<Sport>("basketball");
  const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const ids = await fetchVisitedTeamIds(tab);
        if (!alive) return;
        setVisitedIds(new Set(ids));
      } finally {
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [tab]);

  const pins: UIPin[] = useMemo(() => {
    const base = tab === "basketball" ? BASKETBALL_PINS : BASEBALL_PINS;
    return base.map((p) => ({ ...p, visited: true }));
    // return base.map((p) => ({ ...p, visited: visitedIds.has(p.id) }));
  }, [tab, visitedIds]);

  return (
    <MapForm
      tab={tab}
      onChangeTab={setTab}
      pins={pins}
      loading={loading}
    />
  );
}