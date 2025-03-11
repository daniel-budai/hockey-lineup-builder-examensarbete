// @/components/lineup/builder/team/team-header.tsx
import { useTeam } from "@/hooks/state/useTeam";
import { TeamSelector } from "@/components/lineup/builder/team/team-selector";

export function TeamHeader() {
  const { currentTeam, teams, handleSelectTeam, handleCreateTeam } = useTeam();

  return (
    <div className="flex items-center">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shadow-md"
        style={{
          backgroundColor: currentTeam.primaryColor,
          color: currentTeam.secondaryColor,
        }}
      >
        {currentTeam.abbreviation}
      </div>
      <div className="ml-3">
        <TeamSelector
          teams={teams}
          currentTeam={currentTeam}
          onSelectTeam={handleSelectTeam}
          onCreateTeam={handleCreateTeam}
        />
      </div>
    </div>
  );
}
