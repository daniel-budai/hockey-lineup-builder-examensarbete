"use client";

import { useState, type Dispatch, type SetStateAction } from "react"; //useEffect,
import { Toaster } from "sonner";
import type { LineupData, LineNumber } from "@/types/lineup";
import type { Position } from "@/types/positions";

import { Header } from "@/components/layout";
import { TeamHeader } from "./team/team-header";
import { ActionButtons } from "./team/action-buttons";
import { RosterContainer } from "./roster/roster-container";
import { HockeyRink } from "./rink/hockey-rink";
import { LineTabs } from "./line-tabs";
import { LineupModals } from "./lineup-modals";
import { DndContextProvider } from "./dnd-context-provider";

import { usePlayers } from "@/hooks/state/usePlayers";
import { useModals } from "@/hooks/ui/useModal";
import { useDragAndDrop } from "@/hooks/ui/useDragAndDrop";
import { useLineup } from "@/hooks/state/useLineup";

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

  const { lineup, setLineup } = useLineup();
  const [activeTab, setActiveTab] = useState<LineNumber>("line1");
  const [hoveredTab] = useState<LineNumber | null>(null);

  const handleLineupChange = (newLineup: LineupData): void => {
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
    setActiveTab: (value: LineNumber) => {
      setActiveTab(value);
    },
  });

  const handleResetLineup = (): void => {
    setLineup(emptyLineup);
  };

  const removePlayerCompletely = (playerId: string): void => {
    handleRemovePlayer(playerId);
    const newLineup = structuredClone(lineup);
    let changed = false;

    (Object.keys(newLineup) as LineNumber[]).forEach((lineKey) => {
      (Object.keys(newLineup[lineKey]) as Position[]).forEach((position) => {
        if (newLineup[lineKey][position]?._id === playerId) {
          newLineup[lineKey][position] = null;
          changed = true;
        }
      });
    });

    if (changed) {
      setLineup(newLineup);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-x-hidden">
      <Header />

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

      <main className="container mx-auto px-2 sm:px-4 py-3 sm:py-6 max-w-full overflow-x-hidden">
        <div className="flex flex-col space-y-4 sm:space-y-6">
          <DndContextProvider
            sensors={sensors}
            activePlayer={activePlayer}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr] lg:grid-cols-[2fr_1fr]">
              <div className="bg-[#1e293b]/80 rounded-lg sm:rounded-xl shadow-lg border border-white/5 overflow-hidden backdrop-blur-sm">
                <LineTabs
                  lineup={lineup}
                  activeTab={activeTab}
                  hoveredTab={hoveredTab}
                  onTabChange={(tab: LineNumber) => setActiveTab(tab)}
                />

                <div className="p-2 sm:p-4 md:p-6">
                  <HockeyRink
                    line={lineup[activeTab]}
                    lineNumber={parseInt(activeTab.replace("line", ""), 10)}
                  />
                </div>
              </div>

              <RosterContainer
                players={players}
                onViewDetails={(player) =>
                  handleViewPlayerDetails(
                    player,
                    setPlayerDetailOpen as Dispatch<SetStateAction<boolean>>
                  )
                }
                onRemovePlayer={removePlayerCompletely}
              />
            </div>
          </DndContextProvider>
        </div>
      </main>

      <LineupModals
        addPlayerOpen={addPlayerOpen}
        playerDetailOpen={playerDetailOpen}
        createTeamOpen={createTeamOpen}
        setAddPlayerOpen={setAddPlayerOpen as Dispatch<SetStateAction<boolean>>}
        setPlayerDetailOpen={
          setPlayerDetailOpen as Dispatch<SetStateAction<boolean>>
        }
        setCreateTeamOpen={
          setCreateTeamOpen as Dispatch<SetStateAction<boolean>>
        }
        selectedPlayer={selectedPlayer}
        handleAddPlayer={handleAddPlayer}
        handleRemovePlayer={handleRemovePlayer}
      />

      <Toaster richColors />
    </div>
  );
}
