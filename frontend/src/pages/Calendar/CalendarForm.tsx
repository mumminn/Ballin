import { SegmentToggle } from "components/common/SegmentToggle"
import { Tab, Stamp } from "types/calendar"
import { NavigationBar } from "components/NavigationBar/NavigationBar";
import Calendar from "components/calendar/Calendar";

interface CalendarProps {
    tab: Tab;
    setTab: (v: Tab) => void;
    stamp?: Stamp[];
}
export function CalendarForm ({
    tab, setTab, stamp
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
                className="mt-14"
                />
            

            <Calendar
                stamps={stamp}
                filter={tab}
            />

            <NavigationBar 
            />

        </div>

        
    );
}