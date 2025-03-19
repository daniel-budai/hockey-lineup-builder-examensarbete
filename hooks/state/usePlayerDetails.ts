// hooks/state/usePlayerDetails.ts
import { useState } from "react";
import type { Player } from "@/types/player";
import type { Dispatch, SetStateAction } from "react";

export function usePlayerDetails() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleViewPlayerDetails = (
    player: Player,
    setModalOpen: Dispatch<SetStateAction<boolean>>
  ): void => {
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  return {
    selectedPlayer,
    setSelectedPlayer,
    handleViewPlayerDetails,
  };
}
