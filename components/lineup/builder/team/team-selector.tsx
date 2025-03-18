"use client";
import { useTeamStore } from "@/stores/teamStore";
import { useLineupStore } from "@/stores/lineupStore";
import { usePlayerStore } from "@/stores/playerStore";
import { Team } from "@/types/team";
import { toast } from "sonner";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamSelectorProps {
  onCreateTeamClick: () => void;
}

export function TeamSelector({ onCreateTeamClick }: TeamSelectorProps) {
  const teams = useTeamStore((state) => state.teams);
  const currentTeam = useTeamStore((state) => state.currentTeam);
  const selectTeam = useTeamStore((state) => state.selectTeam);
  const loadLineup = useLineupStore((state) => state.loadLineup);
  const resetLineup = useLineupStore((state) => state.resetLineup);
  const resetPlayers = usePlayerStore((state) => state.resetPlayers);
  const fetchPlayers = usePlayerStore((state) => state.fetchPlayers);
  const [isLoading, setIsLoading] = useState(false);

  const handleTeamSelect = async (team: Team) => {
    try {
      setIsLoading(true);
      // Reset states first
      resetLineup();
      resetPlayers();

      // Select team first
      selectTeam(team);

      // Wait for both operations to complete
      await Promise.all([loadLineup(), fetchPlayers()]);

      toast.success("Team loaded successfully");
    } catch (error) {
      console.error("Error loading team:", error);
      toast.error("Failed to load team");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={currentTeam?._id || ""}
        onValueChange={(value) => {
          const team = teams.find((t) => t._id === value);
          if (team) handleTeamSelect(team);
        }}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700">
          <SelectValue placeholder="Select a team" />
        </SelectTrigger>
        <SelectContent>
          {teams.map((team) => (
            <SelectItem key={team._id} value={team._id} disabled={isLoading}>
              {team.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        className="bg-slate-800 border-slate-700"
        onClick={onCreateTeamClick}
        disabled={isLoading}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
