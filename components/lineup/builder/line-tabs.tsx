import { LineTab } from "./rink/line-tab";

interface LineTabsProps {
  lineup: LineupData;
  activeTab: string;
  hoveredTab: string | null;
  onTabChange: (tab: string) => void;
}

export function LineTabs({
  lineup,
  activeTab,
  hoveredTab,
  onTabChange,
}: LineTabsProps) {
  return (
    <div className="flex border-b border-[#334155]/50 overflow-x-auto">
      {Object.keys(lineup).map((line, index) => (
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
