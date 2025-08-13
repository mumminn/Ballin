import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarForm } from "./CalendarForm";
import { Tab, Stamp } from "types/calendar"

export default function CalendarPage() {
    const [tab, setTab] = useState<Tab>('all');
    const stamps: Stamp[] = [
        { date: new Date(2025, 7, 1), sport: 'basketball', result: 'lose',  team: 'kia' },
        { date: new Date(2025, 7, 5), sport: 'baseball',    result: 'win', team: 'kia' },
      ];

      const navigator = useNavigate();

      const onRecord = () => {
            navigator('/record');        
      }

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