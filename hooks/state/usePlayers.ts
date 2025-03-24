// @/hooks/state/usePlayers.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { playerService } from "@/services/api/playerService";
import type { Player } from "@/types/player";
import type { LineupData, LineConfiguration } from "@/types/lineup";
import type { Dispatch, SetStateAction } from "react";
import { usePlayerFilters } from "./usePlayerFilters";
import { usePlayerActions } from "./usePlayerActions";
import { useLineupStorage } from "./useLineupStorage";
import { usePlayerDetails } from "./usePlayerDetails";

type FilterTabType = "all" | "forwards" | "defense" | "goalies";

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
  readonly handlePlayerDrop: (
    playerId: string,
    position: string,
    lineNumber: number
  ) => void;
}

export function usePlayers(): UsePlayersReturn {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedTeamId");
    }
    return null;
  });

  const {
    searchQuery,
    setSearchQuery,
    filterTab,
    setFilterTab,
    getAvailablePlayers,
  } = usePlayerFilters(players);

  const { handleAddPlayer, handleRemovePlayer } = usePlayerActions(
    players,
    setPlayers
  );

  const { handlePlayerDrop } = useLineupStorage();

  const { selectedPlayer, setSelectedPlayer, handleViewPlayerDetails } =
    usePlayerDetails();

  useEffect(() => {
    const handleStorageChange = () => {
      const newTeamId = localStorage.getItem("selectedTeamId");
      if (newTeamId !== currentTeamId) {
        setCurrentTeamId(newTeamId);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [currentTeamId]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setIsLoading(true);
        const teamId = localStorage.getItem("selectedTeamId");
        if (!teamId) {
          setPlayers([]);
          return;
        }

        const fetchedPlayers = await playerService.getTeamPlayers(teamId);
        const lineupKey = `hockey-lineup-${teamId}`;
        const savedLineup = localStorage.getItem(lineupKey);
        const lineupData = savedLineup
          ? (JSON.parse(savedLineup) as LineupData)
          : null;

        if (lineupData) {
          const playersWithLineupData = fetchedPlayers.map((player) => ({
            ...player,
            inLineup: Object.values(lineupData).some(
              (line: LineConfiguration) =>
                Object.values(line).some(
                  (p: Player | null) => p?._id === player._id
                )
            ),
          }));
          setPlayers(playersWithLineupData);
        } else {
          setPlayers(fetchedPlayers);
        }
      } catch (error) {
        toast.error("Failed to fetch players");
        console.error("Error fetching players:", error);
        setPlayers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [currentTeamId]);

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
    handlePlayerDrop: (
      playerId: string,
      position: string,
      lineNumber: number
    ) => handlePlayerDrop(playerId, position, lineNumber, players),
  } as const;
}
