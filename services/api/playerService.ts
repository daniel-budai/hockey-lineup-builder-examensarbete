// services/api/playerService.ts
import type { Player } from "@/types/player";

interface CreatePlayerDTO {
  name: string;
  number: string;
  position: string;
  teamId: string;
}

export const playerService = {
  async getTeamPlayers(teamId: string): Promise<Player[]> {
    console.log("Fetching players for team:", teamId); // Debug log

    const response = await fetch(`/api/player?teamId=${teamId}`);
    const data = await response.json();

    console.log("API response:", data); // Debug log

    if (!response.ok) {
      throw new Error("Failed to fetch players");
    }

    return data.players;
  },

  async createPlayer(playerData: CreatePlayerDTO): Promise<Player> {
    const response = await fetch("/api/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    });

    console.log("Request data:", playerData);
    const responseData = await response.json();
    console.log("Response from server:", responseData);

    if (!response.ok) {
      throw new Error(
        `Failed to create player: ${response.status} ${
          responseData.error || ""
        } ${JSON.stringify(responseData.issues || {})}`
      );
    }

    return responseData.player;
  },

  async updatePlayer(
    playerId: string,
    playerData: Partial<CreatePlayerDTO>
  ): Promise<Player> {
    const response = await fetch(`/api/player/${playerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    });

    if (!response.ok) {
      throw new Error("Failed to update player");
    }

    const data = await response.json();
    return data.player;
  },

  async deletePlayer(playerId: string): Promise<void> {
    const response = await fetch(`/api/player/${playerId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete player");
    }
  },
};
