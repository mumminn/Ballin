import { SubLayout } from "@/components/layout/SubLayout";
import { NavigationBar } from "@/components/navigationBar/NavigationBar";
import { SegmentToggle } from "@/components/common/SegmentToggle";
import type { Sport } from "@/types/calendar";

export type UIPin = {
  id: string;
  logo: string;
  x: number;
  y: number;
  visited: boolean;
  size?: number;
};

interface MapFormProps {
  tab: Sport;
  onChangeTab: (next: Sport) => void;

  pins: UIPin[];
  loading?: boolean;
}

export function MapForm({
  tab,
  onChangeTab,
  pins,
  loading = false,
}: MapFormProps) {
  return (
    <SubLayout
      header={
        <div className="flex items-center justify-between w-full">
          <p className="text-2xl">직관 지도</p>
        </div>
      }
      footer={<NavigationBar />}
      barHeight={56}
      maxWidth={480}
    >
        <div className="w-full max-w-[480px] mx-auto min-h-dvh overflow-y-auto pb-[88px]">
            {/* 토글 */}
            <div className="px-5">
            <SegmentToggle
                options={[
                { label: "농구", value: "basketball" },
                { label: "야구", value: "baseball" },
                ]}
                value={tab}
                onChange={onChangeTab}
                size="md"
                className="mt-6"
            />
            </div>

            <div className="mt-10">
                <div className="relative w-full aspect-[3/5] overflow-hidden rounded-2xl">
                    <img
                    src="/images/map.svg"
                    alt="대한민국 지도"
                    className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                    draggable={false}
                    />

                    {pins.map((p) => (
                    <img
                        key={p.id}
                        src={p.logo}
                        className={[
                        "absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 w-10 sm:w-12",
                        p.visited ? "opacity-100" : "opacity-20 grayscale",
                        ].join(" ")}
                        style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }}
                        draggable={false}
                    />
                ))}
                </div>
            </div>
        </div>
    </SubLayout>
  );
}