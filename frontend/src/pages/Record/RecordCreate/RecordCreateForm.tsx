import { BackButton } from "components/common/BackButton";
import RecordCreateCate from "components/record/RecordCreateCate";
import { Sport } from "types/calendar";
import { NavigationBar } from "components/NavigationBar/NavigationBar";

interface RecordCreateProps {
    value?: Sport;
    onSelect: (sport: Sport) => void;
}

export function RecordCreateForm ({
    value,
    onSelect
}: RecordCreateProps) {
    return(
        <div>
            <BackButton />

            <p>종목을 선택해주세요.</p>


            <div className="flex flex-col">
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

            <NavigationBar 
            />

        </div>

    )

}