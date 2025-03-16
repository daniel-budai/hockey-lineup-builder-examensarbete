"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react"; // Add this import for the reset icon

import { Header } from "@/components/layout";
import { TeamHeader } from "@/components/lineup/builder/team/team-header";
import { TeamSelector } from "@/components/lineup/builder/team/team-selector";
import { ActionButtons } from "@/components/lineup/builder/team/action-buttons";
import { RinkContainer } from "@/components/lineup/builder/rink/rink-container";
import { RosterContainer } from "@/components/lineup/builder/roster/roster-container";
import { PlayerCard } from "@/components/lineup/builder/roster/player-card";

import { AddPlayerModal } from "@/components/lineup/modals/add-player-modal";
import { PlayerDetailModal } from "@/components/lineup/modals/player-details-modal";
import { CreateTeamModal } from "@/components/lineup/modals/create-team-modal";

import { usePlayers } from "@/hooks/state/usePlayers";
import { useModals } from "@/hooks/ui/useModal";
import { useDragAndDrop } from "@/hooks/ui/useDragAndDrop";
import { useLocalStorage } from "@/hooks/storage/useLocalStorage";

import { HockeyRink } from "@/components/lineup/builder/rink/hockey-rink";
import { LineTab } from "@/components/lineup/builder/rink/line-tab";

const emptyLineup: LineupData = {
  line1: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line2: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line3: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line4: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
};

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

  // Use local storage for lineup persistence
  const [lineup, setLineup] = useLocalStorage<LineupData>(
    "hockey-lineup",
    emptyLineup
  );
  const [activeTab, setActiveTab] = useState<string>("line1");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

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
    previewLineup,
  } = useDragAndDrop({
    lineup,
    setLineup: handleLineupChange, // Use our new handler
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

  const handleViewDetails = (player: Player) => {
    console.log("LineupBuilder handleViewDetails called", { player });

    handleViewPlayerDetails(player);

    setPlayerDetailOpen(true);
  };

  // Add this function to reset the lineup
  const handleResetLineup = () => {
    console.log("Resetting lineup to empty state");

    // Create a fresh copy of the empty lineup to ensure a new reference
    const freshEmptyLineup = JSON.parse(JSON.stringify(emptyLineup));

    // Update both the local storage and the React state
    setLineup(freshEmptyLineup);

    // Force a re-render if needed
    // This is a bit of a hack, but can help diagnose if it's a rendering issue
    setActiveTab((prevTab) => {
      // Toggle and then immediately toggle back to force a re-render
      const tempTab = prevTab === "line1" ? "line2" : "line1";
      setTimeout(() => setActiveTab(prevTab), 0);
      return tempTab;
    });
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
            onResetLineup={handleResetLineup}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 max-w-full overflow-x-hidden">
        <div className="flex flex-col space-y-4 sm:space-y-6">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
          >
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr] lg:grid-cols-[2fr_1fr]">
              <div className="bg-[#1e293b]/80 rounded-lg sm:rounded-xl shadow-lg border border-white/5 overflow-hidden backdrop-blur-sm">
                {/* Line tabs */}
                <div className="flex border-b border-[#334155]/50 overflow-x-auto">
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
                <div className="p-2 sm:p-4 md:p-6">
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

      <CreateTeamModal open={createTeamOpen} onOpenChange={setCreateTeamOpen} />

      <Toaster richColors />
    </div>
  );
}
