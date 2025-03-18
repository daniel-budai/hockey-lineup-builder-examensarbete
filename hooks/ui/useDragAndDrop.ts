// @/hooks/ui/useDragAndDrop.ts
import { LineupData } from "@/types/lineup";
import { useActiveStates } from "./dnd/useActiveStates";
import { useDndSensors } from "./dnd/useDndSensors";
import { useDragHandlers } from "./dnd/useDragHandlers";
import { useLineup } from "@/hooks/state/useLineup";
import { usePlayers } from "@/hooks/state/usePlayers";
import type { LineNumber, LineTab } from "@/types/lineup";

interface UseDragAndDropProps {
  lineup: LineupData;
  setLineup: (lineup: LineupData) => void;
  activeTab: LineNumber;
  setActiveTab: (tab: LineNumber) => void;
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
    setCurrentHoveredTab: setCurrentHoveredTab as (tab: LineTab | null) => void,
    setActiveTab: props.setActiveTab as (tab: LineTab) => void,
    activeStates,
  });

  return {
    ...activeStates,
    sensors,
    ...dragHandlers,
  };
}
