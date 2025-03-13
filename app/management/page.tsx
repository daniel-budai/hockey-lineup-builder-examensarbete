"use client";

import { useTeam } from "@/hooks/state/useTeam";
import { TeamList } from "@/components/management/TeamList";
import { LineupList } from "@/components/management/LineupList";
// import { CreateTeamModal } from "@/components/lineup/builder/team/create-team-modal";
import { CreateTeamModal } from "@/components//lineup/modals/create-team-modal";
import { useState, useEffect } from "react";
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
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Team Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Teams Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Your Teams</h2>
            {isLoading ? (
              <div>Loading teams...</div>
            ) : (
              <TeamList
                teams={teams}
                currentTeam={currentTeam}
                onSelectTeam={handleSelectTeam}
              />
            )}
            <button
              onClick={() => setCreateTeamOpen(true)}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create New Team
            </button>
          </div>
        </div>

        {/* Lineups Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">
              {currentTeam ? `${currentTeam.name}'s Lineups` : "Select a Team"}
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
    </main>
  );
}
