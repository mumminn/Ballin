import { useState, useEffect } from 'react';
import * as React from "react";

import { useNavigate } from 'react-router-dom';
import { RecordCreateDetailForm } from 'components/record/recordCreate/RecordCreateDetailForm';
import { useDebouncedValue } from 'hooks/useDebouncedValue';


export default function RecordCreateDetailPage() {
    const [score, setScore] = useState({ myScore: "", opponentScore: ""});
    const [photo, setPhoto] = React.useState<File | string | null>(null);
    const [date, setDate] = useState<string>('');
    const [myTeam, setMyTeam] = useState<string>('');
    const [opponentTeam, setOpponentTeam] = useState<string>('');
    const [seat, setSeat] = useState<string>('');
    const [review, setReview] = useState<string>('');
    const [stadium, setStadium] = useState<string>('');

    const [loadingMatch, setLoadingMatch] = useState(false);
    const [matchError, setMatchError] = useState<string | null>(null);


    const navigate = useNavigate();

    const debouncedDate = useDebouncedValue(date, 700);
    const debouncedMyTeam = useDebouncedValue(myTeam, 700);

    useEffect(() => {
        if(!debouncedDate || !debouncedMyTeam) return;

        setLoadingMatch(true);
        setMatchError(null);

        setOpponentTeam('한화이글스');
        setStadium('광주기아챔피언스필드');
        setScore({ myScore: '3', opponentScore: '2' })

        setLoadingMatch(false);

    }, [debouncedDate, debouncedMyTeam]);
 
    const submit = () => {
        if(!date || !myTeam || !opponentTeam || !stadium || !score || !photo || !seat || !review) {
            alert('입력을 확인하세요.')
            return;
        }
        const my = Number(score.myScore || 0);
        const opp = Number(score.opponentScore || 0);

        
        console.log('date', date);
        console.log('응원팀', myTeam);
        console.log('상대팀', opponentTeam);
        console.log('경기장', stadium);
        console.log('경기결과:', my +' : '+ opp);
        console.log('사진', photo);
        console.log('자리', seat);
        console.log('review', review);
        
        alert("저장되었습니다.");
        navigate("/record");
    };

    

    return (
        <RecordCreateDetailForm 
            myScore={score.myScore}
            opponentScore={score.opponentScore}
            stadium={stadium}
            opponentTeam={opponentTeam}
            photo={photo} 
            myTeam={myTeam}
            date={date}
            seat={seat}
            review={review}
            loadingMatch={loadingMatch}
            matchError={matchError}
            onChangeScore={setScore}
            onChangeOpponentTeam={setOpponentTeam}
            onChangeStadium={setStadium}
            onChangeSeat={setSeat}
            onChangeReview={setReview}
            onChangePhoto={setPhoto}
            onRecord={submit}
            onChangeDate={setDate}
            onChangeMyTeam={setMyTeam}
        />
    )
}