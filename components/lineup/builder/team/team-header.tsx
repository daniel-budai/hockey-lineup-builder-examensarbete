// @/components/lineup/builder/team/team-header.tsx
import { useTeam } from "@/hooks/state/useTeam";
import { TeamSelector } from "@/components/lineup/builder/team/team-selector";

export function TeamHeader() {
  const { currentTeam, teams, handleSelectTeam, handleCreateTeam } = useTeam();

  return (
    <div className="flex items-center space-x-3">
      <TeamSelector
        teams={teams}
        currentTeam={currentTeam}
        onSelectTeam={handleSelectTeam}
        onCreateTeam={handleCreateTeam}
        onCreateTeamClick={() => {}} // You can implement this later if needed
      />
    </div>
  );
}
