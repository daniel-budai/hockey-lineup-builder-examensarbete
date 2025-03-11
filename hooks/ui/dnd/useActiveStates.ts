import { useState } from "react";
import type { Player, LineupData } from "@/types/lineup";

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
