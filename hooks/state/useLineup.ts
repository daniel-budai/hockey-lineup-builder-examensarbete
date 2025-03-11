// @/hooks/state/useLineup.ts
import { useState } from "react";
import { toast } from "sonner";
import type { LineupData, Position, Player } from "@/types/lineup";

const emptyLineup: LineupData = {
  line1: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line2: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line3: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line4: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
};

export function useLineup() {
  const [lineup, setLineup] = useState<LineupData>(emptyLineup);
  const [activeTab, setActiveTab] = useState<string>("line1");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  function handleTabClick(line: string) {
    setActiveTab(line);
  }

  function saveLineup(teamId: string, teamName: string) {
    const lineupData = {
      teamId,
      lineup,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(`lineup-${teamId}`, JSON.stringify(lineupData));

    toast.success(`${teamName} lineup has been saved successfully.`);
  }

  function loadLineup(teamId: string) {
    const savedLineup = localStorage.getItem(`lineup-${teamId}`);
    if (savedLineup) {
      try {
        const lineupData = JSON.parse(savedLineup);
        setLineup(lineupData.lineup);
      } catch (error) {
        console.error("Failed to parse saved lineup:", error);
      }
    } else {
      setLineup(emptyLineup);
    }
  }

  function isPositionValid(player: Player, dropPosition: Position): boolean {
    if (!player.positions) {
      return false;
    }
    return player.positions.includes(dropPosition);
  }

  return {
    lineup,
    setLineup,
    activeTab,
    setActiveTab,
    hoveredTab,
    setHoveredTab,
    handleTabClick,
    saveLineup,
    loadLineup,
    isPositionValid,
  };
}
