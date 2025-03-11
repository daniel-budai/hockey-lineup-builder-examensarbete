"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

import { Header } from "@/components/lineup/builder/header";
import { TeamHeader } from "@/components/lineup/builder/team/team-header";
import { TeamSelector } from "@/components/lineup/builder/team/team-selector";
import { ActionButtons } from "@/components/lineup/builder/team/action-buttons";
import { RinkContainer } from "@/components/lineup/builder/rink/rink-container";
import { RosterContainer } from "@/components/lineup/builder/roster/roster-container";
import { PlayerCard } from "@/components/lineup/builder/roster/player-card";

import { AddPlayerModal } from "@/components/lineup/modals/add-player-modal";
import { PlayerDetailModal } from "@/components/lineup/modals/player-details-modal";
import { CreateTeamModal } from "@/components/lineup/builder/team/create-team-modal";

import { usePlayers } from "@/hooks/state/usePlayers";
import { useModals } from "@/hooks/ui/useModal";
import { useDragAndDrop } from "@/hooks/ui/useDragAndDrop";

import { HockeyRink } from "@/components/lineup/builder/rink/hockey-rink";
import { LineTab } from "@/components/lineup/builder/rink/line-tab";

export function LineupBuilder() {
  const {
    players,
    selectedPlayer,
    handleAddPlayer,
    handleRemovePlayer,
    handleViewPlayerDetails,
  } = usePlayers();
  const {
    addPlayerOpen,
    createTeamOpen,
    playerDetailOpen,
    setAddPlayerOpen,
    setCreateTeamOpen,
    setPlayerDetailOpen,
  } = useModals();

  const [lineup, setLineup] = useState<LineupData>({
    line1: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
    line2: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
    line3: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
    line4: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  });
  const [activeTab, setActiveTab] = useState<string>("line1");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const {
    activePlayer,
    sensors,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    previewLineup,
  } = useDragAndDrop({
    lineup,
    setLineup,
    activeTab,
    setActiveTab,
  });

  // Add this effect to log state changes
  useEffect(() => {
    console.log("LineupBuilder - addPlayerOpen:", addPlayerOpen);
  }, [addPlayerOpen]);

  // Add this effect to debug modal state
  useEffect(() => {
    console.log("Modal state changed:", { playerDetailOpen, selectedPlayer });
  }, [playerDetailOpen, selectedPlayer]);

  // Create a combined handler for viewing player details
  const handleViewDetails = (player: Player) => {
    console.log("LineupBuilder handleViewDetails called", { player });
    // Set the selected player
    handleViewPlayerDetails(player);
    // Open the modal
    setPlayerDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Header />

      {/* Team Selector and Actions */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <TeamHeader />
          <ActionButtons
            onAddPlayer={() => setAddPlayerOpen(true)}
            onCreateTeam={() => setCreateTeamOpen(true)}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
          >
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="bg-[#1e293b]/80 rounded-xl shadow-lg border border-white/5 overflow-hidden backdrop-blur-sm">
                {/* Line tabs */}
                <div className="flex border-b border-[#334155]/50">
                  {Object.keys(lineup).map((line, index) => (
                    <LineTab
                      key={line}
                      line={line}
                      index={index}
                      activeTab={activeTab}
                      hoveredTab={hoveredTab}
                      onClick={() => setActiveTab(line)}
                    />
                  ))}
                </div>

                {/* Rink */}
                <div className="p-6">
                  <HockeyRink
                    line={lineup[activeTab as keyof LineupData]}
                    lineNumber={Number.parseInt(activeTab.replace("line", ""))}
                  />
                </div>
              </div>

              <RosterContainer
                players={players}
                onViewDetails={handleViewDetails}
                onRemovePlayer={handleRemovePlayer}
              />
            </div>

            <DragOverlay>
              {activePlayer ? (
                <PlayerCard player={activePlayer} isDragging />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>

      {/* Modals */}
      <AddPlayerModal
        open={addPlayerOpen}
        onOpenChange={setAddPlayerOpen}
        onAddPlayer={handleAddPlayer}
      />

      {selectedPlayer && (
        <PlayerDetailModal
          open={playerDetailOpen}
          onOpenChange={setPlayerDetailOpen}
          player={selectedPlayer}
          onRemovePlayer={handleRemovePlayer}
        />
      )}

      {/* <CreateTeamModal open={createTeamOpen} onOpenChange={setCreateTeamOpen} /> */}

      <Toaster richColors />
    </div>
  );
}
