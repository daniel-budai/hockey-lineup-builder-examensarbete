"use client";

import { useTeam } from "@/hooks/state/useTeam";
import { TeamList } from "@/components/management/TeamList";
import { LineupList } from "@/components/management/LineupList";
// import { CreateTeamModal } from "@/components/lineup/builder/team/create-team-modal";
import { CreateTeamModal } from "@/components//lineup/modals/create-team-modal";
import { useState } from "react";
import { useCreateTeam } from "@/hooks/useCreateTeam";

export default function ManagementPage() {
  const { teams, currentTeam, isLoading, handleSelectTeam, fetchTeams } =
    useTeam();
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const { handleCreateTeam: createTeamHookHandleCreateTeam } = useCreateTeam();

  // Handle when a team is created
  const handleTeamCreated = (team) => {
    // Refresh the teams list
    fetchTeams();

    // Optionally select the newly created team
    handleSelectTeam(team);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#1e293b] text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-white">Team Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Teams Section */}
          <div className="md:col-span-1">
            <div className="bg-[#1e293b]/80 backdrop-blur-sm border border-[#334155]/30 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Your Teams
              </h2>
              {isLoading ? (
                <div className="text-slate-300">Loading teams...</div>
              ) : (
                <TeamList
                  teams={teams}
                  currentTeam={currentTeam}
                  onSelectTeam={handleSelectTeam}
                />
              )}
              <button
                onClick={() => setCreateTeamOpen(true)}
                className="mt-4 w-full px-4 py-2 bg-white text-[#0f172a] rounded hover:bg-slate-100 transition-colors font-medium"
              >
                Create New Team
              </button>
            </div>
          </div>

          {/* Lineups Section */}
          <div className="md:col-span-2">
            <div className="bg-[#1e293b]/80 backdrop-blur-sm border border-[#334155]/30 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-white">
                {currentTeam
                  ? `${currentTeam.name}'s Lineups`
                  : "Select a Team"}
              </h2>
              {currentTeam && <LineupList teamId={currentTeam._id} />}
            </div>
          </div>
        </div>

        <CreateTeamModal
          open={createTeamOpen}
          onOpenChange={setCreateTeamOpen}
          onTeamCreated={handleTeamCreated}
        />
      </div>
    </main>
  );
}
