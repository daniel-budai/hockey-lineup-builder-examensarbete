import type { Player } from "@/types/player";
import type { LineupData } from "@/types/lineup";

const createEmptyLineup = (): LineupData => ({
  line1: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line2: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line3: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line4: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
});

export function useLineupStorage() {
  const handlePlayerDrop = (
    playerId: string,
    position: string,
    lineNumber: number,
    players: Player[]
  ) => {
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

    return lineupData;
  };

  const removePlayerFromLineup = (playerId: string) => {
    const teamId = localStorage.getItem("selectedTeamId");
    if (!teamId) return;

    const lineupKey = `hockey-lineup-${teamId}`;
    const savedLineup = localStorage.getItem(lineupKey);
    if (savedLineup) {
      const lineupData = JSON.parse(savedLineup);
      Object.keys(lineupData).forEach((lineKey) => {
        Object.keys(lineupData[lineKey]).forEach((position) => {
          if (lineupData[lineKey][position]?._id === playerId) {
            lineupData[lineKey][position] = null;
          }
        });
      });
      localStorage.setItem(lineupKey, JSON.stringify(lineupData));
    }
  };

  return { handlePlayerDrop, removePlayerFromLineup };
}
