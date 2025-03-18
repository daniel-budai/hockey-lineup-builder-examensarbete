import { DndContext, DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { PlayerCard } from "./roster/player-card";

interface DndContextProviderProps {
  children: React.ReactNode;
  sensors: any[];
  activePlayer: Player | null;
  onDragStart: (event: any) => void;
  onDragMove: (event: any) => void;
  onDragEnd: (event: any) => void;
}

export function DndContextProvider({
  children,
  sensors,
  activePlayer,
  onDragStart,
  onDragMove,
  onDragEnd,
}: DndContextProviderProps) {
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      {children}
      <DragOverlay>
        {activePlayer ? <PlayerCard player={activePlayer} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
