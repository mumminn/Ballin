import { SubLayout } from "components/layout/SubLayout";
import { BackButton } from "components/common/BackButton";
import { NavigationBar } from "components/navigationBar/NavigationBar";
import { RecordEditButton } from "components/record/RecordEditButton";
import { RecordDeleteButton } from "components/record/RecordDeleteButton";
import { FieldShell } from "components/record/FieldShell";
import { ScoreHeader } from "components/record/ScoreHeader";
import { Divider } from "components/common/Divider";
import { ReviewLined } from "components/record/ReviewLined";
import { Stamp, stampPath } from "types/stamp";
import type { ScoreHeaderProps } from "components/record/ScoreHeader";


interface RecordDetailFormProps{
    date?: string;
    seat?: string;
    imgUrl?: string | File;
    review?: string;
    stamp?: Stamp;
    score?: Omit<ScoreHeaderProps, "className" | "logoSize">;

}
export function RecordDetailForm ({
    date='2025.08.01',
    seat="317구역 11열 126",
    imgUrl='/images/baseball_character.svg',
    review='재밌고 멋진 경기였다. 내일 또 와야지~~~ 내일도 이겼으면 좋겠다',
    stamp={ result: 'win', sport: 'baseball', team: 'kia' },
    score={
        myTeam: { name: "기아 타이거즈", logo: "/images/logos/kia.svg" },
        opponentTeam: { name: "한화 이글스", logo: "/images/logos/hanwha.svg" },
        myScore: 3,
        opponentScore: 2,
        stadium: "광주기아챔피언스필드",
      },
}: RecordDetailFormProps) {

    const imageSrc = typeof imgUrl === "string" ? imgUrl : URL.createObjectURL(imgUrl);
    return(
        <SubLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <BackButton />
                    <div className="flex items-center gap-3">
                        <RecordEditButton />
                        <RecordDeleteButton />
                    </div>
                </div>
            }
            footer={<NavigationBar />}
            barHeight={56}
            maxWidth={480}
            className="md:!pt-2"
            >
                <div className="grid">
                    <FieldShell date={date} className="relative">
                        <div className="grid gap-3">
                            <ScoreHeader
                                className="w-full"
                                {...score} 
                            />

                            <Divider inset={16} className="my-2" />

                            <p className="text-right">{seat}</p>

                            <img src={imageSrc} alt="경기 사진" className="mx-auto w-full h-46 object-cover" />

                            <ReviewLined value={review} readOnly />

                            {stamp && (
                                <img
                                src={stampPath(stamp)}
                                alt={`결과 스탬프: ${stamp.result}`}
                                className="pointer-events-none select-none absolute right-0 bottom-0 w-[92px] h-auto opacity-50"
                                />
                            )}
                        </div>
                    </FieldShell>

                    <button
                        className="items-center mx-auto mt-4 text-sm">
                        그날의 하이라이트 보러가기 {'>'}
                    </button>
            </div>
        </SubLayout>
    )
}