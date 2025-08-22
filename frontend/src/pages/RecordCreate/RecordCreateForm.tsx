import { BackButton } from "@/components/common/BackButton";
import RecordCreateCate from "@/components/record/RecordCreateCate";
import { Sport } from "@/types/calendar";
import { NavigationBar } from "@/components/navigationBar/NavigationBar";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SubLayout } from "@/components/layout/SubLayout";

interface RecordCreateProps {
  value?: Sport;
  onSelect: (sport: Sport) => void;
  onCreate: (sport: Sport) => void;
}

export function RecordCreateForm({
  value,
  onSelect,
  onCreate,
}: RecordCreateProps) {
  return (
    <SubLayout
      header={<BackButton />}
      footer={<NavigationBar />}
      barHeight={56}
      maxWidth={480}
    >
      <div className="flex flex-col gap-[clamp(50px,15vw,80px)]">
        <div className="flex flex-col items-center gap-[clamp(50px,15vw,80px)] w-full">
          <p className="text-center text-xl font-semibold">종목을 선택해주세요.</p>

          <div className="grid grid-cols-2 gap-[clamp(8px,3.5vw,16px)] justify-items-center">
            <RecordCreateCate
              text="농구"
              sport="basketball"
              selected={value === "basketball"}
              onClick={() => onSelect("basketball")}
            />
            <RecordCreateCate
              text="야구"
              sport="baseball"
              selected={value === "baseball"}
              onClick={() => onSelect("baseball")}
            />
          </div>
        </div>

        <PrimaryButton
          type="submit"
          disabled={!value}
          onClick={() => value && onCreate(value)}
        >
          확인
        </PrimaryButton>
      </div>
    </SubLayout>
  );
}
