// @/hooks/ui/useDragAndDrop.ts
import { LineupData } from "@/types/lineup";
import { useActiveStates } from "./dnd/useActiveStates";
import { useDndSensors } from "./dnd/useDndSensors";
import { useDragHandlers } from "./dnd/useDragHandlers";
import { useLineup } from "@/hooks/state/useLineup";
import { usePlayers } from "@/hooks/state/usePlayers";

interface UseDragAndDropProps {
  lineup: LineupData;
  setLineup: (lineup: LineupData) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function useDragAndDrop(props: UseDragAndDropProps) {
  const activeStates = useActiveStates();
  const sensors = useDndSensors();
  const { setHoveredTab: setCurrentHoveredTab, isPositionValid } = useLineup();
  const { players } = usePlayers();

  const dragHandlers = useDragHandlers({
    ...props,
    players,
    isPositionValid,
    setCurrentHoveredTab,
    activeStates,
  });

  return {
    ...activeStates,
    sensors,
    ...dragHandlers,
  };
}
