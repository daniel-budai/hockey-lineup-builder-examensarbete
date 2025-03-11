"use client";
import type { Team } from "@/types/team";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";

interface TeamSelectorProps {
  teams: Team[];
  currentTeam: Team | null;
  onSelectTeam: (team: Team) => void;
  onCreateTeam: (team: Omit<Team, "id" | "createdAt" | "updatedAt">) => boolean;
  onCreateTeamClick: () => void;
}

export function TeamSelector({
  teams,
  currentTeam,
  onSelectTeam,
  onCreateTeam,
  onCreateTeamClick,
}: TeamSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-[#334155] text-white hover:bg-[#1e293b] rounded-full shadow-sm"
        >
          {currentTeam ? (
            <div className="flex items-center">
              <div
                className="w-6 h-6 rounded-full mr-2 flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: currentTeam.primaryColor,
                  color: currentTeam.secondaryColor,
                }}
              >
                {currentTeam.abbreviation}
              </div>
              <span>{currentTeam.name}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </div>
          ) : (
            <div className="flex items-center">
              <span>Select Team</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="rounded-xl shadow-lg bg-[#1e293b] border-[#334155] text-white min-w-[200px]"
      >
        {teams.map((team) => (
          <DropdownMenuItem
            key={team.id}
            className="hover:bg-[#0f172a] focus:bg-[#0f172a] cursor-pointer"
            onClick={() => onSelectTeam(team)}
          >
            <div
              className="w-6 h-6 rounded-full mr-2 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: team.primaryColor,
                color: team.secondaryColor,
              }}
            >
              {team.abbreviation}
            </div>
            <span>{team.name}</span>
          </DropdownMenuItem>
        ))}

        {teams.length > 0 && <DropdownMenuSeparator className="bg-[#334155]" />}

        <DropdownMenuItem
          className="hover:bg-[#0f172a] focus:bg-[#0f172a] cursor-pointer"
          onClick={onCreateTeamClick}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
