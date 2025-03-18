// @/hooks/state/usePlayers.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Player } from "@/types/player";
import type { LineupData } from "@/types/lineup";

type FilterTabType = "all" | "forwards" | "defense" | "goalies";
type Position = "LW" | "C" | "RW" | "LD" | "RD" | "G";

const FORWARD_POSITIONS: Position[] = ["LW", "C", "RW"];
const DEFENSE_POSITIONS: Position[] = ["LD", "RD"];
const GOALIE_POSITION: Position = "G";

interface UsePlayersReturn {
  readonly players: Player[];
  readonly searchQuery: string;
  readonly setSearchQuery: (query: string) => void;
  readonly filterTab: FilterTabType;
  readonly setFilterTab: (tab: FilterTabType) => void;
  readonly selectedPlayer: Player | null;
  readonly setSelectedPlayer: (player: Player | null) => void;
  readonly handleAddPlayer: (player: Omit<Player, "id">) => boolean;
  readonly handleRemovePlayer: (playerId: string) => void;
  readonly getAvailablePlayers: (lineup: LineupData) => Player[];
  readonly handleViewPlayerDetails: (player: Player) => void;
}

export function usePlayers(): UsePlayersReturn {
  const [players, setPlayers] = useState<Player[]>(() => {
    if (typeof window !== "undefined") {
      const teamId = localStorage.getItem("selectedTeamId");
      const savedPlayers = localStorage.getItem(`hockey-players-${teamId}`);
      if (savedPlayers) {
        try {
          return JSON.parse(savedPlayers);
        } catch (error) {
          console.error("Failed to parse saved players:", error);
        }
      }
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterTab, setFilterTab] = useState<FilterTabType>("all");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const teamId = localStorage.getItem("selectedTeamId");
    if (teamId) {
      localStorage.setItem(`hockey-players-${teamId}`, JSON.stringify(players));
    }
  }, [players]);

  const handleAddPlayer = (player: Omit<Player, "id">): boolean => {
    const isNumberTaken = players.some((p) => p.number === player.number);
    if (isNumberTaken) {
      toast.error(`Jersey number ${player.number} is already taken`);
      return false;
    }

    const newPlayer: Player = {
      ...player,
      id: `p${Date.now()}`,
    };

    setPlayers((prev) => [...prev, newPlayer]);
    toast.success(`${player.name} has been added to the roster`);
    return true;
  };

  const handleRemovePlayer = (playerId: string): void => {
    setPlayers((prev) => prev.filter((p) => p.id !== playerId));
    toast.success("Player has been removed from the roster");
  };

  const getAvailablePlayers = (lineup: LineupData): Player[] => {
    const usedPlayerIds = new Set<string>();

    Object.values(lineup).forEach((line) => {
      Object.values(line).forEach((player) => {
        if (player) usedPlayerIds.add(player.id);
      });
    });

    const filteredPlayers = players
      .filter((player) => !usedPlayerIds.has(player.id))
      .filter((player) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          player.name.toLowerCase().includes(searchLower) ||
          player.positions.some((pos) =>
            pos.toLowerCase().includes(searchLower)
          ) ||
          player.nationality.toLowerCase().includes(searchLower) ||
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

  const handleViewPlayerDetails = (player: Player): void => {
    setSelectedPlayer(player);
  };

  return {
    players,
    searchQuery,
    setSearchQuery,
    filterTab,
    setFilterTab,
    selectedPlayer,
    setSelectedPlayer,
    handleAddPlayer,
    handleRemovePlayer,
    getAvailablePlayers,
    handleViewPlayerDetails,
  } as const;
}
