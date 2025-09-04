import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecordDetailForm } from "./RecordDetailForm";
import { getRecordDetail } from "@/api/record/getRecordDetail";
import { getRecordImageUrl } from "@/api/record/getRecordImageUrl";
import { RecordDetailItem } from "@/types/record";
import { deleteRecord } from "@/api/record/deleteRecord";

const logoOf = (teamCode: string) => `/images/logos/${teamCode}.svg`;

export default function RecordDetailPage() {
    const { recordId } = useParams<{ recordId: string }>();
    const [detail, setDetail] = useState<RecordDetailItem | null>(null);
    const [imgObjectUrl, setImgObjectUrl] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!recordId) return;
        if (!window.confirm("정말 삭제하시겠어요?")) return;
        try {
          await deleteRecord(recordId);
          alert("삭제되었습니다.");
          navigate("/record", { replace: true });
        } catch (e: any) {
          alert(`삭제 실패: ${e?.message ?? e}`);
        }
    };
    
    useEffect(() => {
        if(!recordId) return;

        (async () => {
        const d = await getRecordDetail(recordId);
        setDetail(d);
    
        try {
            const url = await getRecordImageUrl(recordId);
            setImgObjectUrl(url);
        } catch {
            setImgObjectUrl(undefined);
        }
        })();
    }, [recordId]);
    
    if (!detail) return null;
    
    return (
        <RecordDetailForm
        date={detail.matchDate}
        seat={detail.seat}
        imgUrl={imgObjectUrl}
        review={detail.review}
        stamp={{ result: detail.teamResult, team: detail.supportingTeamCode }}
        score={{
            myTeam: { name: detail.supportingTeam, logo: logoOf(detail.supportingTeamCode)},
            opponentTeam: { name: detail.opposingTeam, logo: logoOf(detail.opposingTeamCode)},
            myScore: detail.supportingTeamScore,
            opponentScore: detail.opposingTeamScore,
            stadium: detail.stadium,
        }}
        onDelete={handleDelete}
        />
    );
    
}