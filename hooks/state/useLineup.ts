import { useState, useEffect } from "react";
import { toast } from "sonner";
import { lineupService } from "@/services/api/lineupService";
import type { LineupData } from "@/types/lineup";
import type { Player } from "@/types/player";
import type { Position } from "@/types/positions";
import { createEmptyLineup } from "./useLineupStorage";
import { useRouter } from "next/navigation";

type LineTab = "line1" | "line2" | "line3" | "line4";
interface UseLineupReturn {
  readonly lineup: LineupData;
  readonly setLineup: (lineup: LineupData) => void;
  readonly activeTab: LineTab;
  readonly setActiveTab: (tab: LineTab) => void;
  readonly hoveredTab: LineTab | null;
  readonly setHoveredTab: (tab: LineTab | null) => void;
  readonly handleTabClick: (line: LineTab) => void;
  readonly saveLineup: (teamId: string, teamName: string) => Promise<void>;
  readonly loadLineup: (teamId: string | null) => void;
  readonly isPositionValid: (player: Player, dropPosition: Position) => boolean;
}

export function useLineup(): UseLineupReturn {
  const router = useRouter();
  const [lineup, setLineup] = useState<LineupData>(() => {
    try {
      const teamId = localStorage.getItem("selectedTeamId");
      if (!teamId) return createEmptyLineup();

      const lineupKey = `hockey-lineup-${teamId}`;
      const savedLineup = localStorage.getItem(lineupKey);

      if (savedLineup) {
        const parsedLineup = JSON.parse(savedLineup) as LineupData;
        return parsedLineup;
      }
    } catch (error) {
      console.error("Error loading lineup from localStorage:", error);
    }
    return createEmptyLineup();
  });

  const [hoveredTab, setHoveredTab] = useState<LineTab | null>(null);
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(
    localStorage.getItem("selectedTeamId")
  );

  useEffect(() => {
    const teamId = localStorage.getItem("selectedTeamId");
    if (!teamId) return;

    const lineupKey = `hockey-lineup-${teamId}`;
    localStorage.setItem(lineupKey, JSON.stringify(lineup));
    console.log("Saving lineup to localStorage:", lineup); // Debug log
  }, [lineup]);

  useEffect(() => {
    const handleTeamChange = () => {
      const teamId = localStorage.getItem("selectedTeamId");
      if (!teamId) {
        setLineup(createEmptyLineup());
        setCurrentTeamId(null);
        return;
      }

      const lineupKey = `hockey-lineup-${teamId}`;
      const savedKey = `saved_${lineupKey}`;

      const currentLineup = localStorage.getItem(lineupKey);
      const savedLineup = localStorage.getItem(savedKey);

      const lineupData = currentLineup || savedLineup;

      if (lineupData) {
        try {
          const parsedLineup = JSON.parse(lineupData) as LineupData;
          setLineup(parsedLineup);

          if (!currentLineup && savedLineup) {
            localStorage.setItem(lineupKey, lineupData);
            localStorage.removeItem(savedKey);
          }
        } catch (error) {
          console.error("Error parsing saved lineup:", error);
          setLineup(createEmptyLineup());
        }
      } else {
        setLineup(createEmptyLineup());
      }
    };

    handleTeamChange();

    window.addEventListener("storage", handleTeamChange);
    window.addEventListener("team-changed", handleTeamChange);

    return () => {
      window.removeEventListener("storage", handleTeamChange);
      window.removeEventListener("team-changed", handleTeamChange);
    };
  }, [currentTeamId]);

  const [activeTab, setActiveTab] = useState<LineTab>("line1");

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
        : createEmptyLineup();

      await lineupService.saveLineup({
        teamId,
        name: `${teamName} Lineup - ${new Date().toLocaleDateString()}`,
        lineup: parsedLineup,
      });

      toast.success(`${teamName} lineup has been saved successfully.`);
    } catch (error) {
      if (error instanceof Error && error.message === "LOGIN_REQUIRED") {
        toast.error("Please log in to save your lineup");
        router.push(
          `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
        );
      } else {
        toast.error("Failed to save lineup");
        console.error("Error saving lineup:", error);
      }
    }
  };

  const loadLineup = (teamId: string | null): void => {
    if (!teamId) {
      setLineup(createEmptyLineup());
      return;
    }

    const savedLineup = localStorage.getItem(`lineup-${teamId}`);
    if (!savedLineup) {
      setLineup(createEmptyLineup());
      return;
    }

    try {
      const lineupData = JSON.parse(savedLineup);
      setLineup(lineupData.lineup);
    } catch (error) {
      console.error("Failed to parse saved lineup:", error);
      setLineup(createEmptyLineup());
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
