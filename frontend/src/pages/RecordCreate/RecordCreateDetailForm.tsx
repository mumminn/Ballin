import { SubLayout } from "@/components/layout/SubLayout";
import { BackButton } from "@/components/common/BackButton";
import { NavigationBar } from "@/components/navigationBar/NavigationBar";
import { InputField } from "@/components/common/InputField";
import { RecordScore } from "@/components/recordCreate/RecordScore";
import { RecordPhoto } from "@/components/recordCreate/RecordPhoto";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { RecordReview } from "@/components/recordCreate/RecordReview";
import { TeamSelect } from "@/components/recordCreate/TeamSelect";
import { TeamOption } from "@/types/record";


interface RecordCreateDetailProps {
    myScore: string | number;
    opponentScore: string | number;
    date?: string;
    myTeam: string;
    seat: string;
    review: string;
    opponentTeam: string;
    loadingMatch: boolean;
    matchError: string | null;
    teamOptions: TeamOption[];

    onChangeScore: (next: { myScore: string; opponentScore: string }) => void;
    photo?: File | string | null;
    onChangePhoto?: (file: File | null) => void;
    onRecord: () => void;
    onMatchData: () => void;
    onChangeDate: (date: string) => void;
    onChangeMyTeam: (myTeam: string) => void;
    onChangeOpponentTeam: (opponentTeam: string) => void;
    onChangeSeat: (seat: string) => void;
    onChangeReview: (review: string) => void;

    gameSelectModal?: React.ReactNode;
}

export function RecordCreateDetailForm({
    myScore,
    opponentScore,
    date,
    myTeam,
    photo,
    seat,
    review,
    teamOptions,
    loadingMatch,
    matchError,
    opponentTeam,
    onChangeScore,
    onChangePhoto,
    onRecord,
    onChangeDate,
    onChangeMyTeam,
    onChangeOpponentTeam,
    onMatchData,
    onChangeSeat,
    onChangeReview,
    gameSelectModal,
}: RecordCreateDetailProps) {
    return (
        <SubLayout
            header={<BackButton />}
            footer={<NavigationBar />}
            barHeight={56}
            maxWidth={480}
            className="!pt-4 md:!pt-6"
        >
            <div className="w-full max-w-[480px] mx-auto min-h-dvh overflow-y-auto pb-[72px]">

                {gameSelectModal}

                <div className="grid grid-cols-9 justify-items-center gap-[clamp(15px,6vw,30px)]">
                    <InputField
                        label="Date"
                        containerClassName="col-span-full"
                        type="date"
                        value={date}
                        onChange={(e) => onChangeDate(e.target.value)}
                        />

                    <TeamSelect
                        label="응원 팀"
                        containerClassName="col-span-full"
                        value={myTeam}
                        onChange={onChangeMyTeam}
                        options={teamOptions}
                    />

                    <PrimaryButton
                        children="경기 정보 불러오기"
                        className="col-span-full"
                        onClick={onMatchData}

                       />

                    <InputField
                        label="상대 팀"
                        onChange={(e) => onChangeOpponentTeam(e.target.value)} 
                        containerClassName="col-span-full"
                        value={opponentTeam}
                        type="text"
                        readOnly
                    />
                    {loadingMatch && <p className="col-span-full text-sm text-gray-500">경기 정보를 불러오는 중…</p>}
                    {matchError && <p className="col-span-full text-sm text-red-500">불러오기 실패: {matchError}</p>}
                    

                    <RecordScore
                        containerClassName="col-span-full"
                        myScore={myScore}
                        opponentScore={opponentScore}
                        onChange={onChangeScore}
                        readOnly
                        />
                    <RecordPhoto
                        containerClassName="col-span-full"
                        value={photo}
                        onChange={onChangePhoto}
                        />
                    <InputField
                        label="자리"
                        containerClassName="col-span-full"
                        onChange={(e) => onChangeSeat(e.target.value)}
                        value={seat}
                        type="text"
                    />
                    <RecordReview
                        label="Review"
                        value={review}
                        onChange={(e) => onChangeReview(e.target.value)}
                        containerClassName="col-span-full"
                    />
                    <PrimaryButton
                        children="저장"
                        className="col-span-full"
                        onClick={onRecord}
                    />

                </div>
            </div>
            

        </SubLayout>



        
    )
}