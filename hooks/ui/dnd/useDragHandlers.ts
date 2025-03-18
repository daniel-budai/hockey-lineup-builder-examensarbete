import type {
  DragStartEvent,
  DragMoveEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import type { Player } from "@/types/player";
import type { Position } from "@/types/positions";
import type { LineTab, LineupData } from "@/types/lineup";
import { toast } from "sonner";
import { useLineupManipulation } from "./useLineupManipulation";
import { useTabHandling } from "./useTabHandling";
import { useActiveStates } from "./useActiveStates";

interface UseDragHandlersProps {
  lineup: LineupData;
  setLineup: (lineup: LineupData) => void;
  setActiveTab: (tab: LineTab) => void;
  players: Player[];
  isPositionValid: (player: Player, position: Position) => boolean;
  setCurrentHoveredTab: (tab: LineTab | null) => void;
  activeStates: ReturnType<typeof useActiveStates>;
}

export function useDragHandlers({
  lineup,
  setLineup,
  setActiveTab,
  players,
  isPositionValid,
  setCurrentHoveredTab,
  activeStates,
}: UseDragHandlersProps) {
  const { removePlayerFromLineup } = useLineupManipulation();
  const { handleTabHover } = useTabHandling({
    setCurrentHoveredTab: setCurrentHoveredTab as (tab: string | null) => void,
    setActiveTab: setActiveTab as (tab: string) => void,
    setPreviewLineup: activeStates.setPreviewLineup,
  });

  function handleDragStart(event: DragStartEvent) {
    const playerId = event.active.id.toString();
    const [line, position] = playerId.includes("line")
      ? playerId.split("-")
      : [null, null];

    const player = line
      ? lineup[line as keyof LineupData][position as Position]
      : players.find((p) => p.id === playerId);

    if (player) {
      activeStates.setActivePlayer(player);
      activeStates.setActivePosition(position);
    }
  }

  function handleDragMove(event: DragMoveEvent) {
    const { over, active } = event;
    if (!over || !activeStates.activePlayer) {
      handleTabHover(null);
      return;
    }

    const overId = over.id.toString();
    if (overId.startsWith("tab-")) {
      const tabLine = overId.replace("tab-", "");
      const [sourceLine] = active.id.toString().split("-");

      if (handleTabHover(tabLine, sourceLine)) {
        const newLineup = removePlayerFromLineup(
          lineup,
          activeStates.activePlayer.id
        );
        activeStates.setPreviewLineup(newLineup);
      }
    } else {
      handleTabHover(null);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !activeStates.activePlayer) {
      activeStates.resetActiveStates();
      setCurrentHoveredTab(null);
      return;
    }

    const newLineup = removePlayerFromLineup(
      lineup,
      activeStates.activePlayer.id
    );
    const overId = over.id.toString();

    if (overId.startsWith("tab-")) {
      const targetLine = overId.replace("tab-", "") as LineTab;
      if (active.id.toString().includes("line")) {
        const [, sourcePosition] = active.id.toString().split("-");
        newLineup[targetLine][sourcePosition as Position] =
          activeStates.activePlayer;
      }
      console.log("Setting lineup after tab drop:", newLineup);
      setLineup(newLineup);
      setActiveTab(targetLine);
    } else if (overId.includes("-")) {
      const [targetLine, targetPosition] = overId.split("-");

      if (
        !isPositionValid(activeStates.activePlayer, targetPosition as Position)
      ) {
        toast.error(
          `${activeStates.activePlayer.name} cannot play as ${targetPosition}`
        );
      } else {
        newLineup[targetLine as LineTab][targetPosition as Position] =
          activeStates.activePlayer;
        console.log("Setting lineup after position drop:", newLineup);
        setLineup(newLineup);
      }
    }

    if (over) {
      const [, position] = over.id.toString().split("-");

      if (position === "G" && activeStates.activePlayer) {
        const updatedLineup = { ...newLineup };

        (Object.keys(updatedLineup) as LineTab[]).forEach((line) => {
          updatedLineup[line].G = activeStates.activePlayer;
        });

        setLineup(updatedLineup);
      } else {
        setLineup(newLineup);
      }
    }

    activeStates.resetActiveStates();
    setCurrentHoveredTab(null);
  }

  return { handleDragStart, handleDragMove, handleDragEnd };
}
