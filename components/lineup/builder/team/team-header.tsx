// @/components/lineup/builder/team/team-header.tsx
import { useTeam } from "@/hooks/state/useTeam";
import { TeamSelector } from "@/components/lineup/builder/team/team-selector";

export function TeamHeader() {
  const { currentTeam, teams, handleSelectTeam, handleCreateTeam } = useTeam();

  // Add a null check before accessing properties
  const primaryColor = currentTeam?.primaryColor || "#0f172a"; // Default color if no team
  const secondaryColor = currentTeam?.secondaryColor || "#ffffff"; // Default color

  return (
    <div className="flex items-center space-x-3">
      {currentTeam ? (
        <>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: primaryColor,
              color: secondaryColor,
            }}
          >
            {currentTeam.abbreviation || currentTeam.name.substring(0, 2)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{currentTeam.name}</h2>
            {currentTeam.city && (
              <p className="text-sm opacity-70">{currentTeam.city}</p>
            )}
          </div>
        </>
      ) : (
        <p>No team selected</p>
      )}
    </div>
  );
}
