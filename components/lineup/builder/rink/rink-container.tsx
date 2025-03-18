// @/components/lineup/builder/rink/rink-container.tsx
import { useLineup } from "@/hooks/state/useLineup";
import { HockeyRink } from "@/components/lineup/builder/rink/hockey-rink";
import { LineTab } from "@/components/lineup/builder/rink/line-tab";
import type { LineupData } from "@/types/lineup";

type LineKey = keyof Pick<LineupData, "line1" | "line2" | "line3" | "line4">;

export function RinkContainer() {
  const { lineup, activeTab, hoveredTab, handleTabClick, previewLineup } =
    useLineup();
  const lineKeys = Object.keys(lineup).filter((key) =>
    key.startsWith("line")
  ) as LineKey[];

  // During drag operations, use hoveredTab for preview, otherwise use activeTab
  const displayTab = hoveredTab || activeTab;

  // Use previewLineup during drag operations if available
  const currentLineup = previewLineup || lineup;

  return (
    <div className="bg-[#1e293b]/80 rounded-xl shadow-lg border border-white/5 overflow-hidden backdrop-blur-sm">
      <div className="flex border-b border-[#334155]/50">
        {lineKeys.map((line, index) => (
          <LineTab
            key={line}
            line={line}
            index={index}
            activeTab={activeTab}
            hoveredTab={hoveredTab}
            onClick={() =>
              handleTabClick(line as "line1" | "line2" | "line3" | "line4")
            }
          />
        ))}
      </div>

      <div className="p-6">
        {lineKeys.map((line) => (
          <div
            key={line}
            style={{ display: displayTab === line ? "block" : "none" }}
          >
            <HockeyRink
              line={currentLineup[line]}
              lineNumber={Number.parseInt(line.replace("line", ""))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
