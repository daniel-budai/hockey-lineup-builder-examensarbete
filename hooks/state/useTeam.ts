// @/hooks/state/useTeam.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { teamService } from "@/services/api/teamService";
import type { Team } from "@/types/team";

type CreateTeamData = Omit<Team, "id" | "createdAt" | "updatedAt">;

export function useTeam() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeams = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const fetchedTeams = await teamService.getTeams();
      setTeams(fetchedTeams);

      const savedTeamId = localStorage.getItem("selectedTeamId");
      if (savedTeamId) {
        const savedTeam = fetchedTeams.find((team) => team._id === savedTeamId);
        if (savedTeam) {
          setCurrentTeam(savedTeam);
          localStorage.setItem("selectedTeamId", savedTeam._id);
          return;
        }
      }

      if (fetchedTeams.length > 0) {
        const defaultTeam = fetchedTeams[0];
        setCurrentTeam(defaultTeam);
        localStorage.setItem("selectedTeamId", defaultTeam._id);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch teams"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTeam = (team: Team): void => {
    console.log("Selecting team:", team);
    setCurrentTeam(team);
    localStorage.setItem("selectedTeamId", team._id);
    console.log("Stored teamId:", localStorage.getItem("selectedTeamId"));
  };

  const handleCreateTeam = async (
    teamData: CreateTeamData
  ): Promise<boolean> => {
    try {
      await teamService.createTeam(teamData);
      toast.success("Team created successfully!");
      void fetchTeams();
      return true;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create team"
      );
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    void fetchTeams();
  }, []);

  return {
    teams,
    currentTeam,
    isLoading,
    handleSelectTeam,
    handleCreateTeam,
    fetchTeams,
  } as const;
}
