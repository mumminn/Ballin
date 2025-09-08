import { SubLayout } from "@/components/layout/SubLayout";
import { BackButton } from "@/components/common/BackButton";
import { NavigationBar } from "@/components/navigationBar/NavigationBar";
import { InputField } from "@/components/common/InputField";
import { RecordScore } from "@/components/recordCreate/RecordScore";
import { RecordPhoto } from "@/components/recordCreate/RecordPhoto";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { RecordReview } from "@/components/recordCreate/RecordReview";
import { TeamSelect } from "@/components/recordCreate/TeamSelect";
import type { TeamOption } from "@/types/record";

interface RecordEditDetailProps {
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

  photo?: File | string | null;
  onChangePhoto?: (file: File | null) => void;

  onChangeScore: (next: { myScore: string; opponentScore: string }) => void;
  onMatchData: () => void;
  onUpdate: () => void;

  onChangeDate: (date: string) => void;
  onChangeMyTeam: (myTeam: string) => void;
  onChangeOpponentTeam: (opponentTeam: string) => void;
  onChangeSeat: (seat: string) => void;
  onChangeReview: (review: string) => void;
}

export function RecordEditDetailForm({
  myScore,
  opponentScore,
  date,
  myTeam,
  seat,
  review,
  opponentTeam,
  loadingMatch,
  matchError,
  teamOptions,

  photo,
  onChangePhoto,

  onChangeScore,
  onMatchData,
  onUpdate,

  onChangeDate,
  onChangeMyTeam,
  onChangeOpponentTeam,
  onChangeSeat,
  onChangeReview,
}: RecordEditDetailProps) {
  return (
    <SubLayout
      header={<BackButton />}
      footer={<NavigationBar />}
      barHeight={56}
      maxWidth={480}
      className="!pt-4 md:!pt-6"
    >
      <div className="w-full max-w-[480px] mx-auto min-h-dvh overflow-y-auto pb-[72px]">
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
            className="col-span-full"
            onClick={onMatchData}
          >
            경기 정보 불러오기
          </PrimaryButton>

          <InputField
            label="상대 팀"
            containerClassName="col-span-full"
            type="text"
            value={opponentTeam}
            onChange={(e) => onChangeOpponentTeam(e.target.value)}
            readOnly
          />

          {loadingMatch && (
            <p className="col-span-full text-sm text-gray-500">
              경기 정보를 불러오는 중…
            </p>
          )}
          {matchError && (
            <p className="col-span-full text-sm text-red-500">
              불러오기 실패: {matchError}
            </p>
          )}

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
            type="text"
            value={seat}
            onChange={(e) => onChangeSeat(e.target.value)}
          />

          <RecordReview
            label="Review"
            containerClassName="col-span-full"
            value={review}
            onChange={(e) => onChangeReview(e.target.value)}
          />

          <PrimaryButton
            className="col-span-full"
            onClick={onUpdate}
          >
            수정
          </PrimaryButton>
        </div>
      </div>
    </SubLayout>
  );
}

export default RecordEditDetailForm;