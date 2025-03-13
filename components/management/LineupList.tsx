"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Lineup } from "@/types/lineup";

interface LineupListProps {
  teamId: string;
}

export function LineupList({ teamId }: LineupListProps) {
  const [lineups, setLineups] = useState<Lineup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLineups() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/lineup?teamId=${teamId}`);
        if (!response.ok) throw new Error("Failed to fetch lineups");
        const data = await response.json();
        setLineups(data.lineups);
      } catch (error) {
        toast.error("Failed to load lineups");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (teamId) {
      fetchLineups();
    }
  }, [teamId]);

  if (isLoading) {
    return <div className="text-gray-500">Loading lineups...</div>;
  }

  if (!lineups || lineups.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No lineups created yet. Create your first lineup!
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {lineups.map((lineup) => (
        <div
          key={lineup._id}
          className="p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          <div className="font-medium">{lineup.name}</div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date(lineup.updatedAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
