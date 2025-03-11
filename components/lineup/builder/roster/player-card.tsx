"use client";

import { cn } from "@/lib/utils";
import type { Player } from "@/types/lineup";
import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  compact?: boolean;
  isDragging?: boolean;
  onViewDetails?: (player: Player) => void;
  onRemovePlayer?: (playerId: string) => void;
}

export function PlayerCard({
  player,
  compact = false,
  isDragging = false,
  onViewDetails,
  onRemovePlayer,
}: PlayerCardProps) {
  if (compact) {
    // Compact view for on-ice positions remains similar but with consistent styling
    return (
      <div
        className={cn(
          "w-full h-full rounded-full border-2 shadow-md",
          "flex flex-col items-center justify-center",
          "bg-[#1e293b] border-[#334155] text-white",
          isDragging && "opacity-70"
        )}
      >
        <div className="font-bold text-xl">{player.number}</div>
        <div className="text-xs font-medium">{player.name.split(" ")[0]}</div>
      </div>
    );
  }

  // Redesigned card for the roster
  return (
    <div
      className={cn(
        "rounded-lg border border-[#334155] shadow-sm overflow-hidden transition-all hover:shadow-md bg-[#0f172a]/80 backdrop-blur-sm",
        isDragging && "opacity-70"
      )}
    >
      <div className="flex items-stretch">
        {/* Number column */}
        <div className="flex items-center justify-center bg-white text-[#0f172a] font-bold text-2xl px-4 py-3 w-16">
          {player.number}
        </div>

        {/* Player info */}
        <div className="flex-1 p-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-white text-sm">
                {player.name}
              </div>
              <div className="flex items-center mt-1 space-x-2">
                <div className="flex flex-wrap gap-1">
                  {player.positions?.map((position) => (
                    <span
                      key={position}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#334155] text-white"
                    >
                      {position}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-slate-400">
                  {player.nationality}
                </span>
                <span className="text-xs text-slate-400">
                  Age: {player.age}
                </span>
              </div>
            </div>

            {(onViewDetails || onRemovePlayer) && (
              <div className="flex space-x-1">
                {onViewDetails && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-white  group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(
                        "Info button clicked for player:",
                        player.name
                      );
                      if (onViewDetails) {
                        onViewDetails(player);
                      }
                    }}
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">View Details</span>
                  </Button>
                )}

                {onRemovePlayer && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemovePlayer(player.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove Player</span>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Stats */}
          {player.stats && (
            <div className="mt-2 pt-2 border-t border-[#334155]">
              <div className="grid grid-cols-3 gap-2">
                {player.positions?.includes("G") ? (
                  <div className="col-span-3 flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-400">
                      Save %
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {player.stats.savePercentage?.toFixed(3)}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-400">
                        Goals
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {player.stats.goals || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-400">
                        Assists
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {player.stats.assists || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-400">
                        +/-
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {player.stats.plusMinus || 0}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
