import { SegmentToggle } from "components/common/SegmentToggle"
import { Tab } from "types/calendar"
import { NavigationBar } from "components/NavigationBar/NavigationBar";

interface CalendarProps {
    tab: Tab;
    setTab: (v: Tab) => void;
}
export function CalendarForm ({
    tab, setTab
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
                className="mt-10"
                />

            <NavigationBar 
            />

        </div>

        
    );
}