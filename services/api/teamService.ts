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
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error + (data.issues ? `: ${JSON.stringify(data.issues)}` : "")
        );
      }

      return data.team;
    } catch (error) {
      console.error("Team creation error:", error);
      throw error;
    }
  },
};
