"use client";

import { useEffect, useState } from "react";
// import { format } from "date-fns";

interface LineupListProps {
  teamId: string;
}

export function LineupList({ teamId }: LineupListProps) {
  const [lineups, setLineups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLineups() {
      try {
        console.log("Fetching lineups for teamId:", teamId); // Debug log
        const response = await fetch(`/api/lineup?teamId=${teamId}`);

        // Log the response status
        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch lineups");
        }

        const data = await response.json();
        console.log("Fetched lineups:", data); // Debug log
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!lineups.length) return <div>No lineups saved for this team yet.</div>;

  return (
    <div className="space-y-4">
      {lineups.map((lineup) => (
        <div
          key={lineup._id}
          className="bg-slate-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{lineup.name}</h3>
            <span className="text-sm text-gray-500">
              {/* {format(new Date(lineup.createdAt), "MMM d, yyyy")} */}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {["line1", "line2", "line3", "line4"].map((line) => (
              <div key={line} className="text-sm">
                <p className="font-medium capitalize">{line}</p>
                <div className="text-gray-600">
                  {Object.entries(lineup[line])
                    .filter(([_, player]) => player)
                    .map(([position, player]) => (
                      <p key={position}>
                        {position}: {player.name} #{player.number}
                      </p>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
