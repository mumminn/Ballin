import { RecordCreateForm } from "./RecordCreateForm";
import { useState } from 'react';
import { Sport } from "@/types/calendar";
import { useNavigate } from "react-router-dom";

export default function RecordCreatePage () {

    const [sport, setSport] = useState<Sport>();

    const handleSelect = (s:Sport) => {
        setSport(s);
    }

    const navigator = useNavigate();

    const onCreate = (v:Sport) => {
        navigator(v);
    }
    
    return (
        <RecordCreateForm 
            value={sport}
            onSelect={handleSelect}
            onCreate={onCreate}
        />
    );
}