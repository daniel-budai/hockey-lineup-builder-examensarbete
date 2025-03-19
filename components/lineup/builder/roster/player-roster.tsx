"use client";

import { useDraggable } from "@dnd-kit/core";
import { PlayerCard } from "@/components/lineup/builder/roster/player-card";
import type { Player } from "@/types/player";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlayerRosterProps {
  players: Player[];
  onViewDetails: (player: Player) => void;
  onRemovePlayer: (playerId: string) => void;
}

export function PlayerRoster({
  players,
  onViewDetails,
  onRemovePlayer,
}: PlayerRosterProps) {
  if (players.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-4">
        <div className="w-16 h-16 rounded-full bg-[#334155]/30 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white">No players available</h3>
        <p className="text-slate-400 mt-1">
          All players have been assigned to the lineup or no players match your
          search.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-350px)]">
      <div className="grid grid-cols-1 gap-3 pr-4">
        {players.map((player) => (
          <DraggablePlayerCard
            key={player._id}
            player={player}
            onViewDetails={onViewDetails}
            onRemovePlayer={onRemovePlayer}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
interface DraggablePlayerCardProps {
  player: Player;
  onViewDetails: (player: Player) => void;
  onRemovePlayer: (playerId: string) => void;
}

function DraggablePlayerCard({
  player,
  onViewDetails,
  onRemovePlayer,
}: DraggablePlayerCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: player._id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <PlayerCard
        player={player}
        isDragging={isDragging}
        onViewDetails={onViewDetails}
        onRemovePlayer={onRemovePlayer}
      />
    </div>
  );
}
