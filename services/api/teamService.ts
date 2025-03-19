import type { Team } from "@/types/team";

export const teamService = {
  async getTeams(): Promise<Team[]> {
    const response = await fetch("/api/teams");

    if (!response.ok) {
      throw new Error("Failed to fetch teams");
    }

    const data = await response.json();
    return data.teams || [];
  },

  async createTeam(
    teamData: Omit<Team, "_id" | "createdAt" | "updatedAt">
  ): Promise<Team> {
    const response = await fetch("/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamData),
    });

    if (!response.ok) {
      throw new Error("Failed to create team");
    }

    const data = await response.json();
    return data.team;
  },
};
