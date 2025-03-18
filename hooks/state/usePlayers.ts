import { usePlayerStore } from "@/stores/playerStore";

export function usePlayers() {
  const selectedPlayer = usePlayerStore((state) => state.selectedPlayer);
  const setSelectedPlayer = usePlayerStore((state) => state.setSelectedPlayer);
  const players = usePlayerStore((state) => state.players);
  const addPlayer = usePlayerStore((state) => state.addPlayer);
  const removePlayer = usePlayerStore((state) => state.removePlayer);
  const getAvailablePlayers = usePlayerStore(
    (state) => state.getAvailablePlayers
  );
  const searchQuery = usePlayerStore((state) => state.searchQuery);
  const setSearchQuery = usePlayerStore((state) => state.setSearchQuery);
  const filterTab = usePlayerStore((state) => state.filterTab);
  const setFilterTab = usePlayerStore((state) => state.setFilterTab);

  return {
    players,
    searchQuery,
    setSearchQuery,
    filterTab,
    setFilterTab,
    selectedPlayer,
    setSelectedPlayer,
    handleAddPlayer: addPlayer,
    handleRemovePlayer: removePlayer,
    getAvailablePlayers,
    handleViewPlayerDetails: setSelectedPlayer,
  };
}
