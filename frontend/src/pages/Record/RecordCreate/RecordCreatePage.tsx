import { RecordCreateForm } from "./RecordCreateForm";
import { useState } from 'react';
import { Sport } from "types/calendar";

export default function RecordCreatePage () {

    const [sport, setSport] = useState<Sport>();

    const handleSelect = (s:Sport) => {
        setSport(s);
    }
    
    return (
        <RecordCreateForm 
            onSelect={handleSelect}
        />
    );
}