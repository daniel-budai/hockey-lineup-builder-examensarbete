import { useState } from "react";
import type { Player } from "@/types/player";
import type { LineupData } from "@/types/lineup";

type FilterTabType = "all" | "forwards" | "defense" | "goalies";
type Position = "LW" | "C" | "RW" | "LD" | "RD" | "G";

const FORWARD_POSITIONS: Position[] = ["LW", "C", "RW"];
const DEFENSE_POSITIONS: Position[] = ["LD", "RD"];
const GOALIE_POSITION: Position = "G";

export function usePlayerFilters(players: Player[]) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterTab, setFilterTab] = useState<FilterTabType>("all");

  const getAvailablePlayers = (lineup: LineupData): Player[] => {
    const usedPlayerIds = new Set<string>();

    Object.values(lineup).forEach((line) => {
      Object.values(line).forEach((player) => {
        if (player) usedPlayerIds.add(player._id);
      });
    });

    const filteredPlayers = players
      .filter((player) => !usedPlayerIds.has(player._id))
      .filter((player) => {
        if (!searchQuery) return true;

        const searchLower = searchQuery.toLowerCase();
        const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();

        return (
          fullName.includes(searchLower) ||
          player.positions.some((pos) =>
            pos.toLowerCase().includes(searchLower)
          ) ||
          (player.nationality &&
            player.nationality.toLowerCase().includes(searchLower)) ||
          player.number.toString().includes(searchQuery)
        );
      });

    switch (filterTab) {
      case "forwards":
        return filteredPlayers.filter((player) =>
          player.positions.some((pos) =>
            FORWARD_POSITIONS.includes(pos as Position)
          )
        );
      case "defense":
        return filteredPlayers.filter((player) =>
          player.positions.some((pos) =>
            DEFENSE_POSITIONS.includes(pos as Position)
          )
        );
      case "goalies":
        return filteredPlayers.filter((player) =>
          player.positions.includes(GOALIE_POSITION)
        );
      default:
        return filteredPlayers;
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    filterTab,
    setFilterTab,
    getAvailablePlayers,
  };
}
