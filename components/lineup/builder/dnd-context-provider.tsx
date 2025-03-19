import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragMoveEvent,
  DragEndEvent,
  SensorDescriptor,
  SensorOptions,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { PlayerCard } from "./roster/player-card";
import type { Player } from "@/types/player";
import type { ReactNode } from "react";

interface DndContextProviderProps {
  children: ReactNode;
  sensors: SensorDescriptor<SensorOptions>[];
  activePlayer: Player | null;
  onDragStart: (event: DragStartEvent) => void;
  onDragMove: (event: DragMoveEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
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
