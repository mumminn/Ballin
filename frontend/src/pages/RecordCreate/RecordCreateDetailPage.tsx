import { useState, useEffect } from 'react';
import * as React from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { RecordCreateDetailForm } from '@/pages/RecordCreate/RecordCreateDetailForm';
import { fetchGames } from '@/api/record/scraper';
import { fetchTeams } from '@/api/record/teamList';
import { createRecord } from "@/api/record/createRecord";
import { GameSelectModal } from '@/components/record/GameSelectModal';

import { Game, TeamOption } from '@/types/record';
import { Sport } from '@/types/calendar';

type DhType = "DH1" | "DH2" | null;

function buildScraperUrl(sport: Sport, date: string) {
  return sport === 'baseball'
    ? `https://m.sports.naver.com/kbaseball/schedule/index?date=${date}`
    : `https://m.sports.naver.com/basketball/schedule/index?category=kbl&date=${date}`;
}

function normTeam(s: string) {
  return s.replace(/[\s-]/g, '').toLowerCase();
}

function applyGameData(
  game: Game,
  myTeam: string,
  setOpponentTeam: (v: string) => void,
  setScore: (v: { myScore: string; opponentScore: string }) => void,
  setHomeTeam: (v: string) => void,
  setShowGameSelectModal: (v: boolean) => void
) {
  const me = normTeam(myTeam);

  if (normTeam(game.team1) === me) {
    setOpponentTeam(game.team2);
    setScore({
      myScore: String(game.score1 ?? ''),
      opponentScore: String(game.score2 ?? ''),
    });
  } else {
    setOpponentTeam(game.team1);
    setScore({
      myScore: String(game.score2 ?? ''),
      opponentScore: String(game.score1 ?? ''),
    });
  }

  if (game.home1 === "홈") {
    setHomeTeam(game.team1);
  } else {
    setHomeTeam(game.team2);
  }

  setShowGameSelectModal(false);
}

export default function RecordCreateDetailPage() {
  const [teamOptions, setTeamOptions] = useState<TeamOption[]>([]);
  const [score, setScore] = useState({ myScore: "", opponentScore: "" });
  const [photo, setPhoto] = useState<File | null>(null);
  const [date, setDate] = useState<string>('');
  const [myTeam, setMyTeam] = useState<string>('');
  const [opponentTeam, setOpponentTeam] = useState<string>('');
  const [seat, setSeat] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [homeTeam, setHomeTeam] = useState<string>('');

  const [loadingMatch, setLoadingMatch] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);

  const [gameOptions, setGameOptions] = useState<Game[]>([]);
  const [showGameSelectModal, setShowGameSelectModal] = useState(false);

  const [dh, setDh] = useState<DhType>(null);

  const navigate = useNavigate();

  const { sport: sportParam } = useParams<{ sport?: string }>();
  const sport: Sport = sportParam === 'basketball' || sportParam === 'baseball' ? sportParam : 'baseball';

  useEffect(() => {
    setDh(null);
    setGameOptions([]);
    setShowGameSelectModal(false);
  }, [myTeam, date]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await fetchTeams(sport);
        if (!alive) return;
        setTeamOptions(list);
      } catch (e) {
        console.error(e);
        setTeamOptions([]);
        setMyTeam("");
      }
    })();
    return () => { alive = false };
  }, [sport]);

  const onMatchData = async () => {
    if (!date) {
      setMatchError('날짜를 입력하세요.');
      return;
    }
    if (!myTeam.trim()) {
      setMatchError('응원 팀을 입력하세요.');
      return;
    }

    setLoadingMatch(true);
    setMatchError(null);

    try {
      const url = buildScraperUrl(sport, date);
      const list: Game[] = await fetchGames(
        sport === 'baseball'
          ? { sport, url, team: myTeam, date: "" }
          : { sport, url, team: myTeam, date }
      );

      const me = normTeam(myTeam);
      const filtered = list.filter(
        (g) => normTeam(g.team1) === me || normTeam(g.team2) === me
      );

      if (filtered.length === 0) {
        setOpponentTeam('');
        setScore({ myScore: '', opponentScore: '' });
        setMatchError('해당 날짜에 입력한 팀의 경기를 찾지 못했습니다.');
        return;
      }

      if (filtered.length > 1) {
        setGameOptions(filtered.slice(0, 2));
        setDh(null);
        setShowGameSelectModal(true);
        return;
      }

      setDh(null);
      applyGameData(filtered[0], myTeam, setOpponentTeam, setScore, setHomeTeam, setShowGameSelectModal);

    } catch (e: any) {
      setOpponentTeam('');
      setScore({ myScore: '', opponentScore: '' });
      setMatchError(e?.message ?? '경기 정보를 불러오지 못했습니다.');
    } finally {
      setLoadingMatch(false);
    }
  };

  const submit = async () => {
    if (!date || !myTeam || !opponentTeam || !score || !photo || !seat || !review) {
      alert('입력을 확인하세요.');
      return;
    }

    const myScore = Number(score.myScore || 0);
    const opponentScore = Number(score.opponentScore || 0);

    const req = {
      date,
      category: sport,
      stadium: homeTeam,
      seat,
      myTeam,
      opponentTeam,
      myScore,
      opponentScore,
      review,
      dh,
    };

    try {
      await createRecord(req, photo);
      alert("저장되었습니다.");
      navigate("/record");
    } catch (e: any) {
      console.error(e);
      alert(`저장 실패: ${e.message ?? e}`);
    }
  };

  return (
    <>
      <RecordCreateDetailForm
        myScore={score.myScore}
        opponentScore={score.opponentScore}
        opponentTeam={opponentTeam}
        photo={photo}
        myTeam={myTeam}
        date={date}
        seat={seat}
        review={review}
        teamOptions={teamOptions}
        loadingMatch={loadingMatch}
        matchError={matchError}
        onMatchData={onMatchData}
        onChangeScore={setScore}
        onChangeOpponentTeam={setOpponentTeam}
        onChangeSeat={setSeat}
        onChangeReview={setReview}
        onChangePhoto={setPhoto}
        onRecord={submit}
        onChangeDate={setDate}
        onChangeMyTeam={setMyTeam}
        gameSelectModal={showGameSelectModal && (
          <GameSelectModal
            gameOptions={gameOptions}
            myTeam={myTeam}
            onSelect={(game) => {

              const idx = gameOptions.findIndex(g => g === game);
              setDh(idx === 0 ? "DH1" : idx === 1 ? "DH2" : null)

              applyGameData(
                game,
                myTeam,
                setOpponentTeam,
                setScore,
                setHomeTeam,
                setShowGameSelectModal
              )
            }}
            onClose={() => setShowGameSelectModal(false)}
          />
        )}
      />
    </>
  );
}