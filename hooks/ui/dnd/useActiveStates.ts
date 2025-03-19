import { useState } from "react";
import type { LineupData } from "@/types/lineup";
import type { Player } from "@/types/player";

export function useActiveStates() {
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [activePosition, setActivePosition] = useState<string | null>(null);
  const [previewLineup, setPreviewLineup] = useState<LineupData | null>(null);

  const resetActiveStates = () => {
    setActivePlayer(null);
    setActivePosition(null);
    setPreviewLineup(null);
  };

  return {
    activePlayer,
    setActivePlayer,
    activePosition,
    setActivePosition,
    previewLineup,
    setPreviewLineup,
    resetActiveStates,
  };
}
