import { LineupData } from "@/types/lineup";
import { Position } from "@/types/positions";

export function useLineupManipulation() {
  const removePlayerFromLineup = (lineup: LineupData, playerId: string) => {
    const newLineup = { ...lineup };
    Object.keys(newLineup).forEach((line) => {
      Object.keys(newLineup[line as keyof LineupData]).forEach((pos) => {
        if (
          newLineup[line as keyof LineupData][pos as Position]?._id === playerId
        ) {
          newLineup[line as keyof LineupData][pos as Position] = null;
        }
      });
    });
    return newLineup;
  };

  return { removePlayerFromLineup };
}
