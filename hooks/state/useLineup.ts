import { useLineupStore } from "@/stores/lineupStore";
import { useActiveStates } from "@/hooks/ui/dnd/useActiveStates";

export function useLineup() {
  const lineup = useLineupStore((state) => state.lineup);
  const setLineup = useLineupStore((state) => state.setLineup);
  const activeTab = useLineupStore((state) => state.activeTab);
  const setActiveTab = useLineupStore((state) => state.setActiveTab);
  const hoveredTab = useLineupStore((state) => state.hoveredTab);
  const setHoveredTab = useLineupStore((state) => state.setHoveredTab);
  const targetLine = useLineupStore((state) => state.targetLine);
  const setTargetLine = useLineupStore((state) => state.setTargetLine);
  const saveLineup = useLineupStore((state) => state.saveLineup);
  const loadLineup = useLineupStore((state) => state.loadLineup);
  const isPositionValid = useLineupStore((state) => state.isPositionValid);
  const resetLineup = useLineupStore((state) => state.resetLineup);

  // Get preview lineup from active states
  const { previewLineup } = useActiveStates();

  return {
    lineup,
    setLineup,
    activeTab,
    setActiveTab,
    hoveredTab,
    setHoveredTab,
    targetLine,
    setTargetLine,
    handleTabClick: setActiveTab,
    saveLineup,
    loadLineup,
    isPositionValid,
    resetLineup,
    previewLineup,
  };
}
