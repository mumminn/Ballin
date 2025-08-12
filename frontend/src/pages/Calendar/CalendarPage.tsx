import { useState } from 'react';
import { CalendarForm } from "./CalendarForm";
import { Tab } from "types/calendar"


export default function CalendarPage() {
    const [tab, setTab] = useState<Tab>('all');

    return (
        <CalendarForm 
            tab={tab}
            setTab={(v) => {
                console.log(v); 
                setTab(v);
            }}
        />
    );
}