"use client";

import { useDroppable } from "@dnd-kit/core";
import type { LineNumber } from "@/types/lineup";

interface LineTabProps {
  line: LineNumber;
  index: number;
  activeTab: LineNumber;
  hoveredTab: LineNumber | null;
  onClick: () => void;
}

export function LineTab({
  line,
  index,
  activeTab,
  hoveredTab,
  onClick,
}: LineTabProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `tab-${line}`,
    data: {
      type: "TAB",
      lineNumber: line,
    },
  });

  // Determine if this tab should appear active (either it's the selected tab or being hovered during drag)
  const isActive = activeTab === line;
  const isHovered = hoveredTab === line;

  return (
    <div
      ref={setNodeRef}
      className={`relative px-6 py-3 cursor-pointer transition-all duration-200 font-medium text-center flex-1 ${
        isActive
          ? "bg-[#334155] text-white border-b-2 border-white"
          : isOver || isHovered
          ? "bg-[#1e293b] text-white"
          : "bg-[#0f172a] text-slate-300 hover:bg-[#1e293b] hover:text-white"
      }`}
      onClick={onClick}
    >
      Line {index + 1}
    </div>
  );
}
