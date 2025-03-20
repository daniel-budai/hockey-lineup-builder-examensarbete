import { toast } from "sonner";
import { playerService } from "@/services/api/playerService";
import type { Player } from "@/types/player";
import { useLineupStorage } from "./useLineupStorage";
import type { Dispatch, SetStateAction } from "react";

export function usePlayerActions(
  players: Player[],
  setPlayers: Dispatch<SetStateAction<Player[]>>
) {
  const { removePlayerFromLineup } = useLineupStorage();

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
        positions: [player.positions[0]],
      });

      setPlayers((prevPlayers: Player[]) => [
        ...prevPlayers,
        {
          stats: newPlayer.stats || { goals: 0, assists: 0, gamesPlayed: 0 },
          _id: newPlayer._id,
          firstName: newPlayer.firstName,
          lastName: newPlayer.lastName,
          number: newPlayer.number,
          positions: newPlayer.positions,
          teamId: newPlayer.teamId,
          nationality: newPlayer.nationality || "",
          birthplace: newPlayer.birthplace || "",
          birthdate: newPlayer.birthdate || "",
          heightCm: newPlayer.heightCm || "",
          heightFt: newPlayer.heightFt || "",
          heightIn: newPlayer.heightIn || "",
          weightKg: newPlayer.weightKg || "",
          weightLbs: newPlayer.weightLbs || "",
          isForward: newPlayer.isForward,
          isDefense: newPlayer.isDefense,
          isGoalie: newPlayer.isGoalie,
          createdAt: newPlayer.createdAt,
          updatedAt: newPlayer.updatedAt,
          inLineup: false,
        },
      ]);

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
      removePlayerFromLineup(playerId);
      setPlayers((prev: Player[]) => prev.filter((p) => p._id !== playerId));
      toast.success("Player has been removed from the roster");
    } catch (error) {
      toast.error("Failed to remove player");
      console.error("Error removing player:", error);
    }
  };

  return { handleAddPlayer, handleRemovePlayer };
}
