import type {
  DragStartEvent,
  DragMoveEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import type { Player, Position, LineupData } from "@/types/lineup";
import { toast } from "sonner";
import { useLineupManipulation } from "./useLineupManipulation";
import { useTabHandling } from "./useTabHandling";

interface UseDragHandlersProps {
  lineup: LineupData;
  setLineup: (lineup: LineupData) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  players: Player[];
  isPositionValid: (player: Player, position: Position) => boolean;
  setCurrentHoveredTab: (tab: string | null) => void;
  activeStates: ReturnType<typeof useActiveStates>;
}

export function useDragHandlers({
  lineup,
  setLineup,
  activeTab,
  setActiveTab,
  players,
  isPositionValid,
  setCurrentHoveredTab,
  activeStates,
}: UseDragHandlersProps) {
  const { removePlayerFromLineup } = useLineupManipulation();
  const { handleTabHover } = useTabHandling({
    setCurrentHoveredTab,
    setActiveTab,
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
      const targetLine = overId.replace("tab-", "");
      if (active.id.toString().includes("line")) {
        const [, sourcePosition] = active.id.toString().split("-");
        newLineup[targetLine as keyof LineupData][sourcePosition as Position] =
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
        newLineup[targetLine as keyof LineupData][targetPosition as Position] =
          activeStates.activePlayer;
        console.log("Setting lineup after position drop:", newLineup);
        setLineup(newLineup);
      }
    }

    activeStates.resetActiveStates();
    setCurrentHoveredTab(null);
  }

  return { handleDragStart, handleDragMove, handleDragEnd };
}
