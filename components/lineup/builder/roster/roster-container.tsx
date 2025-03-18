// @/components/lineup/builder/roster/roster-container.tsx
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerRoster } from "@/components/lineup/builder/roster/player-roster";
import { usePlayerStore } from "@/stores/playerStore";
import type { Player } from "@/types/player";

type FilterTab = "all" | "forwards" | "defense" | "goalies";

interface RosterContainerProps {
  onViewDetails: (player: Player) => void;
  onRemovePlayer: (playerId: string) => void;
}

export function RosterContainer({
  onViewDetails,
  onRemovePlayer,
}: RosterContainerProps) {
  const players = usePlayerStore((state) => state.players);
  const searchQuery = usePlayerStore((state) => state.searchQuery);
  const setSearchQuery = usePlayerStore((state) => state.setSearchQuery);
  const filterTab = usePlayerStore((state) => state.filterTab);
  const setFilterTab = usePlayerStore((state) => state.setFilterTab);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      (player.name?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false) ||
      (player.positions?.some((pos) =>
        pos.toLowerCase().includes(searchQuery.toLowerCase())
      ) ??
        false) ||
      (player.nationality?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false) ||
      (player.number?.toString().includes(searchQuery) ?? false);

    if (!matchesSearch) return false;

    if (filterTab === "all") return true;
    if (filterTab === "forwards")
      return (
        player.positions?.some((pos) => ["LW", "C", "RW"].includes(pos)) ??
        false
      );
    if (filterTab === "defense")
      return (
        player.positions?.some((pos) => ["LD", "RD"].includes(pos)) ?? false
      );
    if (filterTab === "goalies")
      return player.positions?.includes("G") ?? false;

    return true;
  });

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-[#334155]/50">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#0f172a] border-[#334155] text-white placeholder-slate-400 w-full"
            />
          </div>
          <Button
            size="icon"
            variant="outline"
            className="border-[#334155] hover:bg-[#0f172a] text-white"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs
          value={filterTab}
          onValueChange={(value) => setFilterTab(value as typeof filterTab)}
        >
          <TabsList className="bg-[#0f172a] border border-[#334155]">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#1e293b] text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="forwards"
              className="data-[state=active]:bg-[#1e293b] text-white"
            >
              Forwards
            </TabsTrigger>
            <TabsTrigger
              value="defense"
              className="data-[state=active]:bg-[#1e293b] text-white"
            >
              Defense
            </TabsTrigger>
            <TabsTrigger
              value="goalies"
              className="data-[state=active]:bg-[#1e293b] text-white"
            >
              Goalies
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4">
        <PlayerRoster
          players={filteredPlayers}
          onViewDetails={onViewDetails}
          onRemovePlayer={onRemovePlayer}
        />
      </div>
    </div>
  );
}
