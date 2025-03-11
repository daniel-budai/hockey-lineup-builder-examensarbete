// @/components/lineup/builder/rink/rink-container.tsx
import { useLineup } from "@/hooks/state/useLineup";
import { HockeyRink } from "@/components/lineup/builder/rink/hockey-rink";
import { LineTab } from "@/components/lineup/builder/rink/line-tab";

export function RinkContainer() {
  const { lineup, activeTab, hoveredTab, handleTabClick } = useLineup();

  return (
    <div className="bg-[#1e293b]/80 rounded-xl shadow-lg border border-white/5 overflow-hidden backdrop-blur-sm">
      <div className="flex border-b border-[#334155]/50">
        {Object.keys(lineup).map((line, index) => (
          <LineTab
            key={line}
            line={line}
            index={index}
            activeTab={activeTab}
            hoveredTab={hoveredTab}
            onClick={() => handleTabClick(line)}
          />
        ))}
      </div>

      <div className="p-6">
        {Object.entries(lineup).map(([line, players]) => (
          <div
            key={line}
            style={{ display: activeTab === line ? "block" : "none" }}
          >
            <HockeyRink
              line={players}
              lineNumber={Number.parseInt(line.replace("line", ""))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
