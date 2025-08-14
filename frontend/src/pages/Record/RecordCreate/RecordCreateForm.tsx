import { BackButton } from "components/common/BackButton";
import RecordCreateCate from "components/record/RecordCreateCate";
import { Sport } from "types/calendar";
import { NavigationBar } from "components/NavigationBar/NavigationBar";
import { PrimaryButton } from "components/common/PrimaryButton";

interface RecordCreateProps {
    value?: Sport;
    onSelect: (sport: Sport) => void;
    onCreate: (sport: Sport) => void;
}

export function RecordCreateForm ({
    value,
    onSelect,
    onCreate,
}: RecordCreateProps) {
    return(
        <div
            className="min-h-[100dvh] grid grid-rows-[auto,1fr,auto] px-4   
            pt-[calc(env(safe-area-inset-top)+12px)]
            pb-[calc(env(safe-area-inset-bottom)+16px)]"
        >
        <div className="row-start-1">
            <BackButton />
        </div>
        <main className="row-start-2 grid justify-items-center items-start
             pt-[clamp(16px,10vh,96px)]"
        >
            <div className="mx-auto w-full max-w-[480px] flex flex-col gap-[clamp(50px,15vw,80px)]">

                <div className="flex flex-col items-center gap-[clamp(50px,15vw,80px)] w-full">
                    <p className="text-center text-xl font-semibold">
                        종목을 선택해주세요.
                    </p>


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
                    children="확인"
                    disabled={(!value)}
                    onClick={() => value && onCreate(value)}
                />

            </div>
            
        </main>


        <div className="row-start-3">
            <NavigationBar />
        </div>

        </div>

    )

}