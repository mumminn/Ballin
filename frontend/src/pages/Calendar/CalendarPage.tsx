import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarForm } from "./CalendarForm";
import { Tab, Stamp } from "@/types/calendar"
import { fetchStamps } from '@/api/calendar/stamp';

export default function CalendarPage() {
    const [tab, setTab] = useState<Tab>('all');
    const [stamps, setStamps] = useState<Stamp[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    const navigator = useNavigate();

    const onRecord = () => {
          navigator('/record/create');        
    }

    useEffect(() => {
        (async () => {
            try {
                if (tab == 'all') {
                    const data = await fetchStamps();
                    setStamps(data);
                } else {
                    const data = await fetchStamps(tab);
                    setStamps(data);
                }

            } catch (e: any) {
                setErr(e?.message ?? '불러오기 실패');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <div>로딩 중...</div>;
    if (err) return <div className='text-red-600'>{err}</div>


    return (
        <CalendarForm 
            tab={tab}
            setTab={(v) => {
                console.log(v); 
                setTab(v);
            }}
            stamp={stamps}
            onRecord={onRecord}
        />
    );
}