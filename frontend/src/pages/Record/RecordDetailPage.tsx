import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecordDetailForm } from "./RecordDetailForm";
import { getRecordDetail } from "@/api/record/getRecordDetail";
import { getRecordImageUrl } from "@/api/record/getRecordImageUrl";
import { RecordDetailItem } from "@/types/record";
import { deleteRecord } from "@/api/record/deleteRecord";
import { getHighlightsUrl } from "@/api/record/getHighlights";

const logoOf = (teamCode: string) => `/images/logos/${teamCode}.svg`;

export default function RecordDetailPage() {
    const { recordId } = useParams<{ recordId: string }>();
    const { category } = useParams<{ category: string }>();
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

    const handleHighLights = async () => {
        if (!recordId) return;
        try {
            const url = await getHighlightsUrl(recordId);
            window.open(url, "_blank");
        } catch (e) {
            console.error(e);
        }
    }
    
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
        onEdit={() => navigate(`/record/${category}/${recordId}/edit`)}
        onHighLights={handleHighLights}
        />
    );
    
}