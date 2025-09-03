import * as React from "react";
import { SubLayout } from "@/components/layout/SubLayout";
import { NavigationBar } from "@/components/navigationBar/NavigationBar";
import { RecordSearch } from "@/components/record/RecordSearch";
import { RecordCard } from "@/components/record/RecordCard";
import { RecordStamp } from "@/types/recordStamp";

export type RecordItem = {
    id: string;
    date: string;
    myTeam: string;
    opponentTeam: string;
    stadium: string;
    stamp?: RecordStamp;
    homeTeam?: string;
};
  
interface RecordFormProps {
    search?: string;
    records: RecordItem[];
    onChangeSearch?: (v:string) => void;
    onRecord?: (record: RecordItem) => void;
}

export function RecordForm({
    search = "",
    records,
    onChangeSearch = () => {},
    onRecord,
}: RecordFormProps) {
    const filtered = React.useMemo(() => {
        const q = (search || "").trim().toLowerCase();
        if (!q) return records;
        return records.filter((r) => {
            const my = (r.myTeam || "").toLowerCase();
            const opp = (r.opponentTeam || "").toLowerCase();
            return my.includes(q) || opp.includes(q);
          });
        }, [records, search]);


    return(
        <SubLayout
            header={
                <p className="text-2xl">검색</p>
            }
            footer={<NavigationBar />}
            barHeight={56}
            maxWidth={480}>

            <div className="grid grid-cols-1 gap-4 pb-[72px]">
                <div className="col-span-full">
                    <RecordSearch
                        placeholder="팀 이름으로 직관 기록을 검색해보세요."
                        value={search}
                        onChange={(e) => onChangeSearch(e.target.value)}
                    />
            </div>

            {filtered.length === 0 && search ? (
                <p className="text-center text-sm text-gray-500 mt-4">검색 결과가 없어요.</p>
            ):(
                filtered.map((r) => (
                    <RecordCard 
                        key={r.id}
                        containerClassName="col-span-1 cursor-pointer active:scale-[0.99]"
                        date={r.date}
                        myTeam={r.myTeam}
                        opponentTeam={r.opponentTeam}
                        stadium={r.stadium}
                        stamp={r.stamp}
                        homeTeam={r.homeTeam}
                        onClick={() => onRecord?.(r)}
                    />
                ))
            )}
            </div>
        </SubLayout>
    )
}