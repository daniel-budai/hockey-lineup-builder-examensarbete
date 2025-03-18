import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { LineupData } from "@/types/lineup";
import type { Player } from "@/types/player";
import type { Position } from "@/types/positions";

type LineTab = "line1" | "line2" | "line3" | "line4";

interface SaveLineupData {
  teamId: string;
  name: string;
  line1: LineupData["line1"];
  line2: LineupData["line2"];
  line3: LineupData["line3"];
  line4: LineupData["line4"];
}

interface LineupResponse {
  success: boolean;
  error?: string;
}

interface UseLineupReturn {
  readonly lineup: LineupData;
  readonly setLineup: (lineup: LineupData) => void;
  readonly activeTab: LineTab;
  readonly setActiveTab: (tab: LineTab) => void;
  readonly hoveredTab: LineTab | null;
  readonly setHoveredTab: (tab: LineTab | null) => void;
  readonly handleTabClick: (line: LineTab) => void;
  readonly saveLineup: (teamId: string, teamName: string) => Promise<void>;
  readonly loadLineup: (teamId: string) => void;
  readonly isPositionValid: (player: Player, dropPosition: Position) => boolean;
}

const emptyLineup: LineupData = {
  line1: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line2: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line3: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line4: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
};

export function useLineup(): UseLineupReturn {
  const [lineup, setLineup] = useState<LineupData>(() => {
    if (typeof window !== "undefined") {
      const teamId = localStorage.getItem("selectedTeamId");
      if (!teamId) return emptyLineup;

      const saved = localStorage.getItem(`hockey-lineup-${teamId}`);
      if (!saved) return emptyLineup;

      try {
        return JSON.parse(saved) as LineupData;
      } catch (error) {
        console.error("Failed to parse saved lineup:", error);
        return emptyLineup;
      }
    }
    return emptyLineup;
  });

  const [activeTab, setActiveTab] = useState<LineTab>("line1");
  const [hoveredTab, setHoveredTab] = useState<LineTab | null>(null);

  useEffect(() => {
    const teamId = localStorage.getItem("selectedTeamId");
    if (teamId) {
      localStorage.setItem(`hockey-lineup-${teamId}`, JSON.stringify(lineup));
    }
  }, [lineup]);

  const handleTabClick = (line: LineTab): void => {
    setActiveTab(line);
  };

  const saveLineup = async (
    teamId: string,
    teamName: string
  ): Promise<void> => {
    try {
      if (!teamId) {
        toast.error("No team selected");
        return;
      }

      const currentLineup = localStorage.getItem(`hockey-lineup-${teamId}`);
      const parsedLineup: LineupData = currentLineup
        ? JSON.parse(currentLineup)
        : emptyLineup;

      const lineupToSave: SaveLineupData = {
        teamId,
        name: `${teamName} Lineup - ${new Date().toLocaleDateString()}`,
        line1: parsedLineup.line1,
        line2: parsedLineup.line2,
        line3: parsedLineup.line3,
        line4: parsedLineup.line4,
      };

      const response = await fetch("/api/lineup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lineupToSave),
      });

      const data: LineupResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save lineup");
      }

      toast.success(`${teamName} lineup has been saved successfully.`);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to save lineup. Please try again.";
      console.error("Error saving lineup:", error);
      toast.error(errorMessage);
    }
  };

  const loadLineup = (teamId: string): void => {
    if (!teamId) return;

    const savedLineup = localStorage.getItem(`lineup-${teamId}`);
    if (!savedLineup) {
      setLineup(emptyLineup);
      return;
    }

    try {
      const lineupData = JSON.parse(savedLineup);
      setLineup(lineupData.lineup);
    } catch (error) {
      console.error("Failed to parse saved lineup:", error);
      setLineup(emptyLineup);
    }
  };

  const isPositionValid = (player: Player, dropPosition: Position): boolean => {
    return player.positions?.includes(dropPosition) ?? false;
  };

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
  } as const;
}
