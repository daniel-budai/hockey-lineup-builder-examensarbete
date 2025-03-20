import { AddPlayerModal } from "@/components/lineup/modals/add-player-modal";
import { PlayerDetailModal } from "@/components/lineup/modals/player-details-modal";
import { CreateTeamModal } from "@/components/lineup/modals/create-team-modal";
import type { Player } from "@/types/player";
import type { Dispatch, SetStateAction } from "react";

interface LineupModalsProps {
  addPlayerOpen: boolean;
  playerDetailOpen: boolean;
  createTeamOpen: boolean;
  setAddPlayerOpen: Dispatch<SetStateAction<boolean>>;
  setPlayerDetailOpen: Dispatch<SetStateAction<boolean>>;
  setCreateTeamOpen: Dispatch<SetStateAction<boolean>>;
  selectedPlayer: Player | null;
  handleAddPlayer: (player: Omit<Player, "id">) => Promise<boolean>;
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
