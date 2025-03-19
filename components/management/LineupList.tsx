"use client";

import { useEffect, useState } from "react";
import type { LineupData } from "@/types/lineup";

interface LineupListProps {
  teamId: string;
}

interface SavedLineup {
  id: string;
  name: string;
  lineup: LineupData;
  createdAt?: string;
}

export function LineupList({ teamId }: LineupListProps) {
  const [lineups, setLineups] = useState<SavedLineup[]>([]);

  useEffect(() => {
    // Load lineups from localStorage
    const localLineup = localStorage.getItem(`hockey-lineup-${teamId}`);
    if (localLineup) {
      try {
        const parsedLineup = JSON.parse(localLineup);
        // Create a SavedLineup object from localStorage data
        const savedLineup: SavedLineup = {
          id: `local-${teamId}`,
          name: `Current Lineup`,
          lineup: parsedLineup,
          createdAt: new Date().toISOString(),
        };
        setLineups([savedLineup]);
      } catch (error) {
        console.error("Failed to parse lineup from localStorage:", error);
      }
    }
  }, [teamId]);

  if (!lineups.length) {
    return (
      <div className="text-slate-400 text-center py-8">
        No lineups saved yet. Create a lineup to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lineups.map((lineup) => (
        <div
          key={lineup.id}
          className="bg-[#1e293b]/50 rounded-lg p-4 border border-[#334155]/30"
        >
          <h3 className="font-medium text-white mb-2">{lineup.name}</h3>

          {/* Display lineup details */}
          <div className="space-y-2">
            {Object.entries(lineup.lineup).map(([lineName, positions]) => {
              const hasPlayers = Object.values(positions).some(
                (player) => player !== null
              );
              if (!hasPlayers) return null;

              return (
                <div
                  key={lineName}
                  className="border-t border-[#334155]/30 pt-2"
                >
                  <p className="text-sm text-blue-400 mb-1">
                    {lineName.replace("line", "Line ")}
                  </p>
                  <div className="grid grid-cols-6 gap-2 text-sm">
                    {Object.entries(positions).map(
                      ([position, player]) =>
                        player && (
                          <div
                            key={`${lineName}-${position}`}
                            className="bg-[#0f172a]/50 p-2 rounded"
                          >
                            <p className="text-xs text-slate-400">{position}</p>
                            <p className="text-white">{player.name}</p>
                            <p className="text-slate-400">#{player.number}</p>
                          </div>
                        )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
