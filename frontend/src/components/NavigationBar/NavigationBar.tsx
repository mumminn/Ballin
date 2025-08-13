import { NavOption } from "./NavOption";

export function NavigationBar() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[393px]
                 bg-[#4D7E73] px-6 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)]
                 shadow-[0_-6px_20px_rgba(0,0,0,0.15)] z-50"
    >
      <ul className="grid grid-cols-5 gap-4">
        <li><NavOption to="/calendar" text="캘린더" iconName="calendar.png" iconSize="w-6 h-6" /></li>
        <li><NavOption to="/record"   text="기록"   iconName="record.png"    iconSize="w-6 h-6" /></li>
        <li><NavOption to="/stats"    text="통계"   iconName="chart.png"    iconSize="w-6 h-6" textClassName="mt-1.3"/></li>
        <li><NavOption to="/map"      text="지도"   iconName="map.png"      iconSize="w-6 h-6" /></li>
        <li><NavOption to="/settings" text="설정"   iconName="setting.png"     iconSize="w-6 h-6" /></li>
      </ul>
    </nav>
  );
}