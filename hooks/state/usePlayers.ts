// @/hooks/state/usePlayers.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Player } from "@/types/lineup";

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>(() => {
    if (typeof window !== "undefined") {
      const savedPlayers = localStorage.getItem("hockey-players");
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

  useEffect(() => {
    localStorage.setItem("hockey-players", JSON.stringify(players));
  }, [players]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  function handleAddPlayer(player: Omit<Player, "id">) {
    console.log("handleAddPlayer called with:", player);
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
  }

  function handleRemovePlayer(playerId: string) {
    setPlayers((prev) => prev.filter((p) => p.id !== playerId));
    toast.success("Player has been removed from the roster");
  }

  function getAvailablePlayers(lineup: any) {
    const usedPlayerIds = new Set<string>();

    Object.values(lineup).forEach((line) => {
      Object.values(line).forEach((player) => {
        if (player) usedPlayerIds.add(player.id);
      });
    });

    let filteredPlayers = players
      .filter((player) => !usedPlayerIds.has(player.id))
      .filter(
        (player) =>
          player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.positions?.some((pos) =>
            pos.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          player.nationality
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          player.number.toString().includes(searchQuery)
      );

    if (filterTab !== "all") {
      if (filterTab === "forwards") {
        filteredPlayers = filteredPlayers.filter((player) =>
          player.positions?.some((pos) => ["LW", "C", "RW"].includes(pos))
        );
      } else if (filterTab === "defense") {
        filteredPlayers = filteredPlayers.filter((player) =>
          player.positions?.some((pos) => ["LD", "RD"].includes(pos))
        );
      } else if (filterTab === "goalies") {
        filteredPlayers = filteredPlayers.filter((player) =>
          player.positions?.includes("G")
        );
      }
    }

    return filteredPlayers;
  }

  function handleViewPlayerDetails(player: Player) {
    console.log("Setting selected player:", player.name);
    setSelectedPlayer(player);
  }

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
  };
}
