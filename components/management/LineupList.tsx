"use client";

import { useEffect, useState } from "react";

interface LineupListProps {
  teamId: string;
}

const standardPositions = {
  line1: ["LW", "C", "RW", "LD", "RD", "G"],
  line2: ["LW", "C", "RW", "LD", "RD"],
  line3: ["LW", "C", "RW", "LD", "RD"],
  line4: ["LW", "C", "RW", "LD", "RD"],
};

export function LineupList({ teamId }: LineupListProps) {
  const [lineups, setLineups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLineups() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/lineup?teamId=${teamId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch lineups");
        }

        const data = await response.json();
        setLineups(data);
        setError(null);
      } catch (error) {
        console.error("Error details:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch lineups"
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (teamId) {
      fetchLineups();
    }
  }, [teamId]);

  if (isLoading)
    return <div className="text-slate-300 py-4">Loading lineups...</div>;
  if (error) return <div className="text-red-400 py-4">Error: {error}</div>;
  if (!lineups.length)
    return (
      <div className="flex flex-col items-center justify-center py-8 text-slate-300">
        <div className="text-4xl mb-3">🏒</div>
        <p>No lineups saved for this team yet.</p>
      </div>
    );

  return (
    <div className="space-y-6">
      {lineups.map((lineup, index) => (
        <div
          key={`lineup-${index}`}
          className="bg-[#0f172a] rounded-lg p-5 shadow-md border border-[#334155]/50 hover:border-blue-400/50 transition-all"
        >
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#334155]/30">
            <h3 className="font-semibold text-lg text-white flex items-center">
              <span className="mr-2">🏒</span>
              {lineup.name}
            </h3>
          </div>

          <div className="space-y-4">
            {["line1", "line2", "line3", "line4"].map((line) => {
              const hasPlayers = Object.values(lineup[line] || {}).some(
                (player) => player
              );

              if (!hasPlayers) return null;

              return (
                <div
                  key={`${line}-${index}`}
                  className="rounded-md bg-[#1e293b]/50 p-3"
                >
                  <p className="font-medium capitalize text-blue-400 mb-2 text-sm">
                    {line.replace("line", "Line ")}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {standardPositions[line].map((position) => {
                      const player = lineup[line]?.[position];

                      return (
                        <div
                          key={`${position}-${index}`}
                          className={`p-2 rounded border ${
                            player
                              ? "bg-[#0f172a]/70 border-[#334155]/30"
                              : "bg-[#0f172a]/30 border-[#334155]/10"
                          }`}
                        >
                          <p className="text-xs text-slate-400 uppercase">
                            {position}
                          </p>
                          {player ? (
                            <>
                              <p className="text-white font-medium">
                                {player.name}
                              </p>
                              {player.number && (
                                <p className="text-slate-300 text-sm">
                                  #{player.number}
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-slate-500 italic text-sm">
                              Empty
                            </p>
                          )}
                        </div>
                      );
                    })}
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
