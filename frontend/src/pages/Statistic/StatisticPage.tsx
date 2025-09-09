import { useState } from "react";
import StatisticForm from "./StatisticForm"

export function StatisticPage() {

    const [tab, setTab] = useState<string>("text");

    return(
        <StatisticForm 
            tab={tab}
            setTab={setTab}
        />
    );
}