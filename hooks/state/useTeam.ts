// @/hooks/state/useTeam.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Team } from "@/types/team";

export function useTeam() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/teams");
      const data = await response.json();

      if (data.success) {
        setTeams(data.teams);
        const savedTeamId = localStorage.getItem("selectedTeamId");
        if (savedTeamId) {
          const savedTeam = data.teams.find((team) => team._id === savedTeamId);
          if (savedTeam) {
            setCurrentTeam(savedTeam);
            return;
          }
        }
        if (data.teams.length > 0 && !currentTeam) {
          setCurrentTeam(data.teams[0]);
        }
      } else {
        toast.error(data.error || "Failed to fetch teams");
      }
    } catch (error) {
      toast.error("An error occurred while fetching teams");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTeam = (team: Team) => {
    setCurrentTeam(team);
    localStorage.setItem("selectedTeamId", team._id);
  };

  const handleCreateTeam = async (
    teamData: Omit<Team, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Team created successfully!");
        fetchTeams();
        return true;
      } else {
        toast.error(data.error || "Failed to create team");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while creating the team");
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
  };
}
