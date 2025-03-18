import { useTeamStore } from "@/stores/teamStore";

export function useTeam() {
  const teams = useTeamStore((state) => state.teams);
  const currentTeam = useTeamStore((state) => state.currentTeam);
  const isLoading = useTeamStore((state) => state.isLoading);
  const selectTeam = useTeamStore((state) => state.selectTeam);
  const createTeam = useTeamStore((state) => state.createTeam);
  const fetchTeams = useTeamStore((state) => state.fetchTeams);

  return {
    teams,
    currentTeam,
    isLoading,
    handleSelectTeam: selectTeam,
    handleCreateTeam: createTeam,
    fetchTeams,
  };
}
