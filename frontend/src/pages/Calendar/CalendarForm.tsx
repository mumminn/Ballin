import { SegmentToggle } from "components/common/SegmentToggle"
import { Tab, Stamp } from "types/calendar"
import { NavigationBar } from "components/NavigationBar/NavigationBar";
import Calendar from "components/calendar/Calendar";
import { PrimaryButton } from "components/common/PrimaryButton";

interface CalendarProps {
    tab: Tab;
    setTab: (v: Tab) => void;
    stamp?: Stamp[];
    onRecord: () => void;
}

export function CalendarForm ({
    tab, setTab, stamp, onRecord
}: CalendarProps) {
    return(
        <div>
            <SegmentToggle
                options={[
                    { label: '농구', value: 'basketball' },
                    { label: '전체', value: 'all' },
                    { label: '야구', value: 'baseball' },
                ]}
                value={tab}
                onChange={setTab}
                size="sm"
                className="mt-16"
                />
            
            <Calendar
                stamps={stamp}
                filter={tab}
            />

            <PrimaryButton 
                children="직관 기록하기"
                className="mt-7"
                onClick={onRecord}
            />

            <NavigationBar 
            />

        </div>

        
    );
}