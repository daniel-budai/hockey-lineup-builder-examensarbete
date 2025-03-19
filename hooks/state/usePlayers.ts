// @/hooks/state/usePlayers.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { playerService } from "@/services/api/playerService";
import type { Player } from "@/types/player";
import type { LineupData } from "@/types/lineup";
import type { Dispatch, SetStateAction } from "react";

type FilterTabType = "all" | "forwards" | "defense" | "goalies";
type Position = "LW" | "C" | "RW" | "LD" | "RD" | "G";

const FORWARD_POSITIONS: Position[] = ["LW", "C", "RW"];
const DEFENSE_POSITIONS: Position[] = ["LD", "RD"];
const GOALIE_POSITION: Position = "G";

interface UsePlayersReturn {
  readonly players: Player[];
  readonly isLoading: boolean;
  readonly searchQuery: string;
  readonly setSearchQuery: (query: string) => void;
  readonly filterTab: FilterTabType;
  readonly setFilterTab: (tab: FilterTabType) => void;
  readonly selectedPlayer: Player | null;
  readonly setSelectedPlayer: (player: Player | null) => void;
  readonly handleAddPlayer: (player: Omit<Player, "id">) => Promise<boolean>;
  readonly handleRemovePlayer: (playerId: string) => void;
  readonly getAvailablePlayers: (lineup: LineupData) => Player[];
  readonly handleViewPlayerDetails: (
    player: Player,
    setModalOpen: Dispatch<SetStateAction<boolean>>
  ) => void;
}

export function usePlayers(): UsePlayersReturn {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterTab, setFilterTab] = useState<FilterTabType>("all");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setIsLoading(true);
        const teamId = localStorage.getItem("selectedTeamId");
        console.log("Current teamId from localStorage:", teamId);

        if (!teamId) {
          console.log("No teamId found in localStorage");
          return;
        }

        const fetchedPlayers = await playerService.getTeamPlayers(teamId);
        console.log("Fetched players:", fetchedPlayers);
        setPlayers(fetchedPlayers);
      } catch (error) {
        toast.error("Failed to fetch players");
        console.error("Error fetching players:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleAddPlayer = async (
    player: Omit<Player, "id">
  ): Promise<boolean> => {
    const teamId = localStorage.getItem("selectedTeamId");
    if (!teamId) {
      toast.error("No team selected");
      return false;
    }

    const isNumberTaken = players.some((p) => p.number === player.number);
    if (isNumberTaken) {
      toast.error(`Jersey number ${player.number} is already taken`);
      return false;
    }

    try {
      const newPlayer = await playerService.createPlayer({
        ...player,
        teamId,
        number: player.number,
        name: `${player.firstName} ${player.lastName}`,
        position: player.positions[0],
      });

      console.log("New player added:", newPlayer);

      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      toast.success(
        `${player.firstName} ${player.lastName} has been added to the roster`
      );
      return true;
    } catch (error) {
      toast.error("Failed to add player");
      console.error("Error adding player:", error);
      return false;
    }
  };

  const handleRemovePlayer = async (playerId: string): Promise<void> => {
    try {
      await playerService.deletePlayer(playerId);
      setPlayers((prev) => prev.filter((p) => p._id !== playerId));
      toast.success("Player has been removed from the roster");
    } catch (error) {
      toast.error("Failed to remove player");
      console.error("Error removing player:", error);
    }
  };

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

  const handleViewPlayerDetails = (
    player: Player,
    setModalOpen: Dispatch<SetStateAction<boolean>>
  ): void => {
    console.log(
      "handleViewPlayerDetails called with player:",
      player.firstName,
      player.lastName
    );
    setSelectedPlayer(player);
    console.log("Setting playerDetailOpen to true");
    setModalOpen(true);
    console.log("handleViewPlayerDetails completed");
  };

  return {
    players,
    isLoading,
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
