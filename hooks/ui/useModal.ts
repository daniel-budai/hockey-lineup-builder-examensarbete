import { useState } from "react";

export function useModals() {
  const [addPlayerOpen, setAddPlayerOpen] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [playerDetailOpen, setPlayerDetailOpen] = useState(false);

  const wrappedSetAddPlayerOpen = (value: boolean) => {
    console.log("Setting addPlayerOpen to:", value);
    setAddPlayerOpen(value);
  };

  const wrappedSetPlayerDetailOpen = (value: boolean) => {
    console.log("Setting playerDetailOpen to:", value);
    setPlayerDetailOpen(value);
  };

  return {
    addPlayerOpen,
    setAddPlayerOpen: wrappedSetAddPlayerOpen,
    createTeamOpen,
    setCreateTeamOpen,
    playerDetailOpen,
    setPlayerDetailOpen: wrappedSetPlayerDetailOpen,
  };
}
