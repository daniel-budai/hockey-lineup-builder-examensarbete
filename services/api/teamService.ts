import type { Team } from "@/types/team";

interface TeamResponse {
  teams: Team[];
  requiresAuth?: boolean;
  message?: string;
}

export const teamService = {
  getTeams: async (): Promise<Team[]> => {
    const response = await fetch("/api/teams");
    const data = (await response.json()) as TeamResponse;

    if (data.requiresAuth) {
      return [];
    }

    return data.teams;
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
