import { getRecords } from "@/api/record/getRecord";
import { RecordForm, RecordItem } from "@/pages/Record/RecordForm";
import { MatchRecordItem } from "@/types/record";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RecordPage() {
    const [list, setList] = useState<MatchRecordItem[]>([]);
    const [search, setSearch] = useState<string>('');
    const [records, setRecords] = useState<RecordItem[]>([]);

    const navigate = useNavigate();

    const toRecordItem = (m: MatchRecordItem): RecordItem => ({
      id: m.recordId,
      date: m.matchDate,
      myTeam: m.supportingTeam,
      opponentTeam: m.opposingTeam,
      stadium: m.stadium,
      stamp: { result: m.teamResult, team: m.supportingTeamCode},
      homeTeam: m.stadiumTeam,
      category: m.category,
    })

    useEffect(() => {
      (async () => {
        try {
          const data = await getRecords();
          setList(data);
          setRecords(data.map(toRecordItem));
        } catch(e) {
          console.error(e);
        }
      })();
    }, []);

    const handleSelect = (rec: RecordItem) => {
        console.log('선택된 기록:', rec);
        navigate(`/record/${rec.category}/${rec.id}`)
    }

    return(
        <RecordForm
            search={search}
            onChangeSearch={setSearch}
            records={records}
            onRecord={handleSelect}
        />
    )
}