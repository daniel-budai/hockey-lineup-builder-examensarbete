"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

import { Header } from "@/components/layout";
import { TeamHeader } from "@/components/lineup/builder/team/team-header";
import { ActionButtons } from "@/components/lineup/builder/team/action-buttons";
import { RinkContainer } from "@/components/lineup/builder/rink/rink-container";
import { RosterContainer } from "@/components/lineup/builder/roster/roster-container";
import { PlayerCard } from "@/components/lineup/builder/roster/player-card";

import { AddPlayerModal } from "@/components/lineup/modals/add-player-modal";
import { PlayerDetailModal } from "@/components/lineup/modals/player-details-modal";
import { CreateTeamModal } from "@/components/lineup/modals/create-team-modal";

import { useModals } from "@/hooks/ui/useModal";
import { useDragAndDrop } from "@/hooks/ui/useDragAndDrop";

import { useLineupStore } from "@/stores/lineupStore";
import { usePlayerStore } from "@/stores/playerStore";
import type { LineupData } from "@/types/lineup";
import { useTeamStore } from "@/stores/teamStore";

export function LineupBuilder() {
  const {
    addPlayerOpen,
    createTeamOpen,
    playerDetailOpen,
    setAddPlayerOpen,
    setCreateTeamOpen,
    setPlayerDetailOpen,
  } = useModals();

  const lineup = useLineupStore((state) => state.lineup);
  const setLineup = useLineupStore((state) => state.setLineup);
  const loadLineup = useLineupStore((state) => state.loadLineup);
  const resetLineup = useLineupStore((state) => state.resetLineup);
  const [activeTab, setActiveTab] = useState<string>("line1");

  const selectedPlayer = usePlayerStore((state) => state.selectedPlayer);
  const addPlayer = usePlayerStore((state) => state.addPlayer);
  const removePlayer = usePlayerStore((state) => state.removePlayer);
  const setSelectedPlayer = usePlayerStore((state) => state.setSelectedPlayer);
  const currentTeam = useTeamStore((state) => state.currentTeam);

  // Load lineup when team changes
  useEffect(() => {
    if (currentTeam?._id) {
      loadLineup();
    }
  }, [currentTeam?._id, loadLineup]);

  // Add this effect to log state changes
  useEffect(() => {
    console.log("LocalStorage lineup state:", lineup);
  }, [lineup]);

  const handleLineupChange = (newLineup: LineupData) => {
    console.log("Updating lineup with:", newLineup);
    setLineup(newLineup);
  };

  const {
    activePlayer,
    sensors,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useDragAndDrop({
    lineup,
    setLineup: handleLineupChange,
    activeTab,
    setActiveTab,
  });

  useEffect(() => {
    console.log("LineupBuilder - addPlayerOpen:", addPlayerOpen);
  }, [addPlayerOpen]);

  useEffect(() => {
    console.log("Modal state changed:", { playerDetailOpen, selectedPlayer });
  }, [playerDetailOpen, selectedPlayer]);

  useEffect(() => {
    console.log("Lineup state in LineupBuilder:", lineup);
  }, [lineup]);

  // Create our combined player removal function
  const removePlayerCompletely = (playerId: string) => {
    // Remove from roster
    removePlayer(playerId);

    // Remove from lineup - create a new object to ensure state change is detected
    const newLineup = JSON.parse(JSON.stringify(lineup));
    let changed = false;

    Object.keys(newLineup).forEach((lineKey) => {
      Object.keys(newLineup[lineKey]).forEach((position) => {
        if (newLineup[lineKey][position]?.id === playerId) {
          newLineup[lineKey][position] = null;
          changed = true;
        }
      });
    });

    // Only update lineup if changes were made
    if (changed) {
      setLineup(newLineup);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-x-hidden">
      <Header />

      {/* Team Selector and Actions */}
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 max-w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 sm:space-y-4 md:space-y-0">
          <TeamHeader />
          <ActionButtons
            onAddPlayer={() => setAddPlayerOpen(true)}
            onCreateTeam={() => setCreateTeamOpen(true)}
            onResetLineup={resetLineup}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 max-w-full overflow-x-hidden">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr] lg:grid-cols-[2fr_1fr]">
            <RinkContainer />
            <RosterContainer
              onViewDetails={setSelectedPlayer}
              onRemovePlayer={removePlayerCompletely}
            />
          </div>

          <DragOverlay>
            {activePlayer ? (
              <PlayerCard player={activePlayer} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      {/* Modals */}
      <AddPlayerModal
        open={addPlayerOpen}
        onOpenChange={setAddPlayerOpen}
        onAddPlayer={addPlayer}
      />

      {selectedPlayer && (
        <PlayerDetailModal
          open={playerDetailOpen}
          onOpenChange={setPlayerDetailOpen}
          player={selectedPlayer}
          onRemovePlayer={removePlayer}
        />
      )}

      <CreateTeamModal open={createTeamOpen} onOpenChange={setCreateTeamOpen} />

      <Toaster richColors />
    </div>
  );
}
