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

  async function saveLineup(teamId: string, teamName: string) {
    try {
      if (!teamId) {
        toast.error("No team selected");
        return;
      }

      // Get the current lineup state from localStorage
      const currentLineup = localStorage.getItem("hockey-lineup");
      const parsedLineup = currentLineup
        ? JSON.parse(currentLineup)
        : emptyLineup;

      const lineupToSave = {
        teamId,
        name: `${teamName} Lineup - ${new Date().toLocaleDateString()}`,
        // Use the parsed lineup data
        line1: parsedLineup.line1,
        line2: parsedLineup.line2,
        line3: parsedLineup.line3,
        line4: parsedLineup.line4,
      };

      console.log("Current lineup from localStorage:", parsedLineup);
      console.log("Lineup being saved:", lineupToSave);

      const response = await fetch("/api/lineup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lineupToSave),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save lineup");
      }

      toast.success(`${teamName} lineup has been saved successfully.`);
    } catch (error) {
      console.error("Error saving lineup:", error);
      toast.error("Failed to save lineup. Please try again.");
    }
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
