// @/hooks/state/useTeam.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { Team } from "@/types/team";

const defaultTeam: Team = {
  id: "default-team",
  name: "Hockey Club",
  abbreviation: "HC",
  primaryColor: "#0f172a",
  secondaryColor: "#ffffff",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function useTeam() {
  const [teams, setTeams] = useState<Team[]>([defaultTeam]);
  const [currentTeam, setCurrentTeam] = useState<Team>(defaultTeam);

  // Load teams from localStorage on initial render
  useEffect(() => {
    const savedTeams = localStorage.getItem("hockey-teams");
    if (savedTeams) {
      try {
        const parsedTeams = JSON.parse(savedTeams);
        setTeams(parsedTeams);

        if (parsedTeams.length > 0) {
          setCurrentTeam(parsedTeams[0]);
        }
      } catch (error) {
        console.error("Failed to parse saved teams:", error);
      }
    }
  }, []);

  // Save teams to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("hockey-teams", JSON.stringify(teams));
  }, [teams]);

  // Load selected team from localStorage on initial render
  useEffect(() => {
    const selectedTeamId = localStorage.getItem("selected-team-id");
    if (selectedTeamId) {
      const team = teams.find((t) => t.id === selectedTeamId);
      if (team) {
        handleSelectTeam(team);
      }
    }
  }, [teams]);

  function handleSelectTeam(team: Team) {
    setCurrentTeam(team);
    localStorage.setItem("selected-team-id", team.id);
  }

  function handleCreateTeam(
    teamData: Omit<Team, "id" | "createdAt" | "updatedAt">
  ) {
    const teamExists = teams.some(
      (t) => t.name.toLowerCase() === teamData.name.toLowerCase()
    );
    if (teamExists) {
      toast.error(`A team with the name "${teamData.name}" already exists.`);
      return false;
    }

    const newId = `team-${Date.now()}`;
    const newTeam: Team = {
      ...teamData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTeams((prev) => [...prev, newTeam]);
    setCurrentTeam(newTeam);

    toast.success(`${newTeam.name} has been created successfully.`);
    return true;
  }

  return {
    teams,
    currentTeam,
    handleSelectTeam,
    handleCreateTeam,
  };
}
