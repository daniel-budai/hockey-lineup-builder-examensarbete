import { AddPlayerModal } from "@/components/lineup/modals/add-player-modal";
import { PlayerDetailModal } from "@/components/lineup/modals/player-details-modal";
import { CreateTeamModal } from "@/components/lineup/modals/create-team-modal";

interface LineupModalsProps {
  addPlayerOpen: boolean;
  playerDetailOpen: boolean;
  createTeamOpen: boolean;
  setAddPlayerOpen: (open: boolean) => void;
  setPlayerDetailOpen: (open: boolean) => void;
  setCreateTeamOpen: (open: boolean) => void;
  selectedPlayer: Player | null;
  handleAddPlayer: (player: Player) => void;
  handleRemovePlayer: (playerId: string) => void;
}

export function LineupModals({
  addPlayerOpen,
  playerDetailOpen,
  createTeamOpen,
  setAddPlayerOpen,
  setPlayerDetailOpen,
  setCreateTeamOpen,
  selectedPlayer,
  handleAddPlayer,
  handleRemovePlayer,
}: LineupModalsProps) {
  return (
    <>
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
    </>
  );
}
