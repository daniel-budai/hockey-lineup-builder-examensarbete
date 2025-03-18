import { LineTab } from "./rink/line-tab";
import type { LineupData, LineNumber } from "@/types/lineup";

interface LineTabsProps {
  lineup: LineupData;
  activeTab: LineNumber;
  hoveredTab: LineNumber | null;
  onTabChange: (tab: LineNumber) => void;
}

export function LineTabs({
  lineup,
  activeTab,
  hoveredTab,
  onTabChange,
}: LineTabsProps) {
  return (
    <div className="flex border-b border-[#334155]/50 overflow-x-auto">
      {(Object.keys(lineup) as LineNumber[]).map((line, index) => (
        <LineTab
          key={line}
          line={line}
          index={index}
          activeTab={activeTab}
          hoveredTab={hoveredTab}
          onClick={() => onTabChange(line)}
        />
      ))}
    </div>
  );
}
