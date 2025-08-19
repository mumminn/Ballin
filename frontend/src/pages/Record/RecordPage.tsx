import { RecordForm, RecordItem } from "pages/Record/RecordForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RecordPage() {
    const [search, setSearch] = useState<string>('');
    const [records, setRecords] = useState<RecordItem[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        setRecords([
            {
              id: "1",
              date: "2025-09-12",
              myTeam: "기아타이거즈",
              opponentTeam: "한화이글스",
              stadium: "광주기아챔피언스필드",
              stamp: { date: new Date("2025-09-12T00:00:00"), result: "win", sport: "baseball", team: "kia" },
            },
            {
              id: "2",
              date: "2025-08-30",
              myTeam: "기아타이거즈",
              opponentTeam: "두산베어스",
              stadium: "잠실야구장",
              stamp: { date: new Date("2025-08-30T00:00:00"), result: "lose", sport: "baseball", team: "kia" },
            },
          ]);
    }, []);

    const handleSelect = (rec: RecordItem) => {
        console.log('선택된 기록:', rec);
        navigate(`/record/${rec.id}`)
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