import type { Position, LineupData, LineConfiguration } from "@/types/lineup";

export function useLineupManipulation() {
  const removePlayerFromLineup = (lineup: LineupData, playerId: string) => {
    const newLineup = { ...lineup };
    const lineKeys = ["line1", "line2", "line3", "line4"] as const;

    lineKeys.forEach((line) => {
      const lineConfig = newLineup[line] as LineConfiguration;
      Object.keys(lineConfig).forEach((pos) => {
        const player = lineConfig[pos as Position];
        if (player && (player._id === playerId || player.id === playerId)) {
          lineConfig[pos as Position] = null;
        }
      });
    });

    return newLineup;
  };

  return { removePlayerFromLineup };
}
