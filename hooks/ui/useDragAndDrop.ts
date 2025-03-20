// @/hooks/ui/useDragAndDrop.ts
import { LineupData } from "@/types/lineup";
import { useActiveStates } from "./dnd/useActiveStates";
import { useDndSensors } from "./dnd/useDndSensors";
import { useDragHandlers } from "./dnd/useDragHandlers";
import { useLineup } from "@/hooks/state/useLineup";
import { usePlayers } from "@/hooks/state/usePlayers";
import type { LineNumber, LineTab } from "@/types/lineup";
import { useEffect } from "react";

interface UseDragAndDropProps {
  lineup: LineupData;
  setLineup: (lineup: LineupData) => void;
  activeTab: LineNumber;
  setActiveTab: (tab: LineNumber) => void;
  teamChangeCount?: number;
}

export function useDragAndDrop(props: UseDragAndDropProps) {
  const activeStates = useActiveStates();
  const sensors = useDndSensors();
  const { setHoveredTab: setCurrentHoveredTab, isPositionValid } = useLineup();
  const { players } = usePlayers();

  useEffect(() => {
    if (props.teamChangeCount && props.teamChangeCount > 0) {
      activeStates.resetActiveStates();
    }
  }, [props.teamChangeCount]);

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
