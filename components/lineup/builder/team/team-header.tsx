import { useTeam } from "@/hooks/state/useTeam";
import { TeamSelector } from "@/components/lineup/builder/team/team-selector";

export function TeamHeader() {
  const { currentTeam, teams, handleSelectTeam } = useTeam();

  return (
    <div className="flex items-center space-x-3">
      <TeamSelector
        teams={teams}
        currentTeam={currentTeam}
        onSelectTeam={handleSelectTeam}
        onCreateTeamClick={() => {
          // TODO: Implement team creation if needed
        }}
      />
    </div>
  );
}
