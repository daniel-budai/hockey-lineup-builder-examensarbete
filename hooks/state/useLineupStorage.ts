// import type { Player } from "@/types/player";
import type { LineupData } from "@/types/lineup";
import type { Player } from "@/types/player";
import { Position } from "@/types/positions";

export const createEmptyLineup = (): LineupData => ({
  line1: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line2: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line3: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line4: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
});

export function useLineupStorage() {
  const saveLineup = (lineup: LineupData): void => {
    const teamId = localStorage.getItem("selectedTeamId");
    if (!teamId) return;

    const lineupKey = `hockey-lineup-${teamId}`;
    localStorage.setItem(lineupKey, JSON.stringify(lineup));
  };

  const loadLineup = (): LineupData | null => {
    const teamId = localStorage.getItem("selectedTeamId");
    if (!teamId) return null;

    const lineupKey = `hockey-lineup-${teamId}`;
    const savedLineup = localStorage.getItem(lineupKey);

    if (savedLineup) {
      try {
        return JSON.parse(savedLineup) as LineupData;
      } catch (error) {
        console.error("Error parsing saved lineup:", error);
        return null;
      }
    }

    return null;
  };

  const removePlayerFromLineup = (playerId: string): void => {
    const teamId = localStorage.getItem("selectedTeamId");
    if (!teamId) return;

    const lineupKey = `hockey-lineup-${teamId}`;
    const savedLineup = localStorage.getItem(lineupKey);

    if (savedLineup) {
      try {
        const lineup = JSON.parse(savedLineup) as LineupData;
        let changed = false;

        Object.keys(lineup).forEach((line) => {
          Object.keys(lineup[line as keyof LineupData]).forEach((position) => {
            if (
              lineup[line as keyof LineupData][position as Position]?._id ===
              playerId
            ) {
              lineup[line as keyof LineupData][position as Position] = null;
              changed = true;
            }
          });
        });

        if (changed) {
          localStorage.setItem(lineupKey, JSON.stringify(lineup));
        }
      } catch (error) {
        console.error("Error removing player from lineup:", error);
      }
    }
  };

  const handlePlayerDrop = (
    playerId: string,
    position: string,
    lineNumber: number,
    players: Player[]
  ): void => {
    const teamId = localStorage.getItem("selectedTeamId");
    if (!teamId) return;

    const lineupKey = `hockey-lineup-${teamId}`;
    const savedLineup = localStorage.getItem(lineupKey);
    const lineupData = savedLineup
      ? JSON.parse(savedLineup)
      : createEmptyLineup();

    const player = players.find((p) => p._id === playerId);
    if (!player) return;

    lineupData[`line${lineNumber}`][position] = player;
    localStorage.setItem(lineupKey, JSON.stringify(lineupData));
  };

  return {
    saveLineup,
    loadLineup,
    removePlayerFromLineup,
    handlePlayerDrop,
  };
}
