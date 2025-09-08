import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RecordEditDetailForm from "./RecordEditDetailForm";
import { fetchGames } from "@/api/record/scraper";
import { fetchTeams } from "@/api/record/teamList";
import { getRecordDetail } from "@/api/record/getRecordDetail";
import { getRecordImageUrl } from "@/api/record/getRecordImageUrl";
import { updateRecord } from "@/api/record/updateRecord";

import type { Game, TeamOption } from "@/types/record";
import type { Sport } from "@/types/calendar";

function buildScraperUrl(sport: Sport, date: string) {
  return sport === "baseball"
    ? `https://m.sports.naver.com/kbaseball/schedule/index?date=${date}`
    : `https://m.sports.naver.com/basketball/schedule/index?category=kbl&date=${date}`;
}
const normTeam = (s: string) => s.replace(/[\s-]/g, "").toLowerCase();

export default function RecordEditDetailPage() {
  const { sport: sportParam, recordId = "" } = useParams<{ sport?: string; recordId: string }>();
  const navigate = useNavigate();

  const sport: Sport = useMemo(
    () => (sportParam === "basketball" || sportParam === "baseball" ? sportParam : "baseball"),
    [sportParam]
  );

  const [teamOptions, setTeamOptions] = useState<TeamOption[]>([]);
  const [score, setScore] = useState({ myScore: "", opponentScore: "" });

  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [date, setDate] = useState<string>("");
  const [myTeam, setMyTeam] = useState<string>("");
  const [opponentTeam, setOpponentTeam] = useState<string>("");
  const [seat, setSeat] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [homeTeam, setHomeTeam] = useState<string>("");

  const [loadingMatch, setLoadingMatch] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await fetchTeams(sport);
        if (!alive) return;
        setTeamOptions(list);
      } catch {
        if (!alive) return;
        setTeamOptions([]);
        setMyTeam("");
      }
    })();
    return () => { alive = false; };
  }, [sport]);

  useEffect(() => {
    if (!recordId) return;

    let toRevoke: string | null = null;

    (async () => {
      const d = await getRecordDetail(recordId);
      setDate(d.matchDate ?? "");
      setMyTeam(d.supportingTeam ?? "");
      setOpponentTeam(d.opposingTeam ?? "");
      setSeat(d.seat ?? "");
      setReview(d.review ?? "");
      setHomeTeam(d.stadiumTeam ?? "");

      setScore({
        myScore: String(d.supportingTeamScore ?? ""),
        opponentScore: String(d.opposingTeamScore ?? ""),
      });

      try {
        const url = await getRecordImageUrl(recordId);
        setPreviewUrl(url);
        toRevoke = url;
      } catch {
        setPreviewUrl(null);
      }
    })();

    return () => {
      if (toRevoke) URL.revokeObjectURL(toRevoke);
    };
  }, [recordId]);


  const onMatchData = async () => {
    if (!date) return setMatchError("날짜를 입력하세요.");
    if (!myTeam.trim()) return setMatchError("응원 팀을 입력하세요.");

    setLoadingMatch(true);
    setMatchError(null);

    try {
      const url = buildScraperUrl(sport, date);
      const list: Game[] = await fetchGames(
        sport === "baseball"
          ? { sport, url, team: myTeam, date: "" }
          : { sport, url, team: myTeam, date }
      );

      const me = normTeam(myTeam);
      const found = list.find((g) => normTeam(g.team1) === me || normTeam(g.team2) === me);

      if (!found) {
        setOpponentTeam("");
        setScore({ myScore: "", opponentScore: "" });
        setMatchError("해당 날짜에 입력한 팀의 경기를 찾지 못했습니다.");
        return;
      }

      if (normTeam(found.team1) === me) {
        setOpponentTeam(found.team2);
        setScore({
          myScore: String(found.score1 ?? ""),
          opponentScore: String(found.score2 ?? ""),
        });
      } else {
        setOpponentTeam(found.team1);
        setScore({
          myScore: String(found.score2 ?? ""),
          opponentScore: String(found.score1 ?? ""),
        });
      }

      setHomeTeam(found.home1 === "홈" ? found.team1 : found.team2);
    } catch (e: any) {
      setOpponentTeam("");
      setScore({ myScore: "", opponentScore: "" });
      setMatchError(e?.message ?? "경기 정보를 불러오지 못했습니다.");
    } finally {
      setLoadingMatch(false);
    }
  };

  
  const handleChangePhoto = (file: File | null) => {
    setPhoto(file);
    if (file) setPreviewUrl(null);
  };


  const onUpdate = async () => {
    if (!recordId) return;

    if (!date || !myTeam || !opponentTeam || !seat || !review) {
      alert("입력을 확인하세요.");
      return;
    }

    const myScoreNum = Number(score.myScore || 0);
    const oppScoreNum = Number(score.opponentScore || 0);

    const req = {
      date,
      category: sport,
      stadium: homeTeam,
      seat,
      myTeam,
      opponentTeam,
      myScore: myScoreNum,
      opponentScore: oppScoreNum,
      review,
    };

    try {
      await updateRecord(recordId, req, photo ?? undefined);
      alert("수정되었습니다.");
      navigate("/record", { replace: true });
    } catch (e: any) {
      console.error(e);
      alert(`수정 실패: ${e?.message ?? e}`);
    }
  };

  const photoValue: File | string | null = photo ?? previewUrl;

  return (
    <RecordEditDetailForm
      myScore={score.myScore}
      opponentScore={score.opponentScore}
      date={date}
      myTeam={myTeam}
      opponentTeam={opponentTeam}
      seat={seat}
      review={review}
      teamOptions={teamOptions}
      loadingMatch={loadingMatch}
      matchError={matchError}
      photo={photoValue}
      
      onChangeScore={setScore}
      onChangePhoto={handleChangePhoto}
      onMatchData={onMatchData}
      onUpdate={onUpdate}
      onChangeDate={setDate}
      onChangeMyTeam={setMyTeam}
      onChangeOpponentTeam={setOpponentTeam}
      onChangeSeat={setSeat}
      onChangeReview={setReview}
    />
  );
}