"use client";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { PlayerCard } from "@/components/lineup/builder/roster/player-card";
import type { LineConfiguration, Position, Player } from "@/types/lineup";

interface HockeyRinkProps {
  line: LineConfiguration;
  lineNumber: number;
}

export function HockeyRink({ line, lineNumber }: HockeyRinkProps) {
  return (
    <div className="hockey-rink w-full max-w-[700px] mx-auto aspect-[3/4] bg-[#e2e8f0] relative border-2 border-white overflow-hidden rounded-[40px]">
      {/* Goal creases */}
      <div className="absolute left-1/2 top-0 h-12 w-24 border-2 border-[#334155] rounded-b-full -translate-x-1/2" />
      <div className="absolute left-1/2 bottom-0 h-12 w-24 border-2 border-[#334155] rounded-t-full -translate-x-1/2" />

      {/* Player positions - Forward line */}
      <div className="absolute top-[20%] inset-x-0 flex items-center justify-around px-8">
        <PositionDroppable
          id={`line${lineNumber}-LW`}
          position="LW"
          player={line.LW}
        />
        <PositionDroppable
          id={`line${lineNumber}-C`}
          position="C"
          player={line.C}
        />
        <PositionDroppable
          id={`line${lineNumber}-RW`}
          position="RW"
          player={line.RW}
        />
      </div>

      {/* Defense line */}
      <div className="absolute top-[50%] inset-x-0 flex items-center justify-around px-20">
        <PositionDroppable
          id={`line${lineNumber}-LD`}
          position="LD"
          player={line.LD}
        />
        <PositionDroppable
          id={`line${lineNumber}-RD`}
          position="RD"
          player={line.RD}
        />
      </div>

      {/* Goalie */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2">
        <PositionDroppable
          id={`line${lineNumber}-G`}
          position="G"
          player={line.G}
        />
      </div>
    </div>
  );
}

interface PositionDroppableProps {
  id: string;
  position: Position;
  player: Player | null;
}

function PositionDroppable({ id, position, player }: PositionDroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative flex h-24 w-24 items-center justify-center rounded-full ${
        isOver
          ? "bg-[#cbd5e1] border-4 border-[#334155] shadow-lg"
          : "bg-white/90 border-4 border-[#94a3b8]"
      } transition-all duration-200 ${player ? "p-1" : ""}`}
    >
      {player ? (
        <DraggablePlayerCard id={id} player={player} />
      ) : (
        <div className="text-center font-bold text-lg text-[#0f172a]">
          {position}
        </div>
      )}
    </div>
  );
}

interface DraggablePlayerCardProps {
  id: string;
  player: Player;
}

function DraggablePlayerCard({ id, player }: DraggablePlayerCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`absolute inset-0 cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <PlayerCard player={player} compact />
    </div>
  );
}
