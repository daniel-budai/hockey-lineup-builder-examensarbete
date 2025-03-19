import type { LineupData } from "@/types/lineup";

export const lineupService = {
  async getTeamLineups(teamId: string): Promise<LineupData[]> {
    const response = await fetch(`/api/lineup?teamId=${teamId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch lineups");
    }

    return response.json();
  },

  async saveLineup(data: {
    teamId: string;
    name: string;
    lineup: LineupData;
  }): Promise<void> {
    const response = await fetch("/api/lineup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to save lineup");
    }
  },
};
