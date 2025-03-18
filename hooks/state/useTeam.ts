// @/hooks/state/useTeam.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Team } from "@/types/team";

interface TeamResponse {
  success: boolean;
  teams?: Team[];
  error?: string;
}

interface CreateTeamResponse {
  success: boolean;
  team?: Team;
  error?: string;
}

type CreateTeamData = Omit<Team, "id" | "createdAt" | "updatedAt">;

export function useTeam() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void fetchTeams();
  }, []);

  const fetchTeams = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/teams");
      const data: TeamResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch teams");
      }

      if (data.success && data.teams) {
        setTeams(data.teams);
        const savedTeamId = localStorage.getItem("selectedTeamId");

        if (savedTeamId) {
          const savedTeam = data.teams.find((team) => team._id === savedTeamId);
          if (savedTeam) {
            setCurrentTeam(savedTeam);
            return;
          }
        }

        // Set first team as default if no saved team exists
        if (data.teams.length > 0 && !currentTeam) {
          setCurrentTeam(data.teams[0]);
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while fetching teams";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTeam = (team: Team): void => {
    setCurrentTeam(team);
    localStorage.setItem("selectedTeamId", team._id);
  };

  const handleCreateTeam = async (
    teamData: CreateTeamData
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      const data: CreateTeamResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create team");
      }

      if (data.success) {
        toast.success("Team created successfully!");
        void fetchTeams();
        return true;
      }

      return false;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while creating the team";
      toast.error(errorMessage);
      console.error(error);
      return false;
    }
  };

  return {
    teams,
    currentTeam,
    isLoading,
    handleSelectTeam,
    handleCreateTeam,
    fetchTeams,
  } as const; // Make the return type readonly
}
