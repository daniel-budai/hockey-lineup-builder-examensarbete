import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerRoster } from "@/components/lineup/builder/roster/player-roster";
import { usePlayers } from "@/hooks/state/usePlayers";
import type { Player } from "@/types/player";
import type { Position } from "@/types/positions";

type FilterTab = "all" | "forwards" | "defense" | "goalies";

interface RosterContainerProps {
  players: Player[];
  onViewDetails: (player: Player) => void;
  onRemovePlayer: (playerId: string) => void;
}

export function RosterContainer({
  players: allPlayers,
  onViewDetails,
  onRemovePlayer,
}: RosterContainerProps) {
  const { searchQuery, setSearchQuery, filterTab, setFilterTab } = usePlayers();

  const filteredPlayers = allPlayers.filter((player) => {
    const searchLower = searchQuery.toLowerCase();
    const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();

    const matchesSearch =
      fullName.includes(searchLower) ||
      player.positions.some((pos: Position) =>
        pos.toLowerCase().includes(searchLower)
      ) ||
      (player.nationality?.toLowerCase() || "").includes(searchLower) ||
      player.number.toString().includes(searchQuery);

    if (!matchesSearch) return false;

    if (filterTab === "all") return true;
    if (filterTab === "forwards") return player.isForward;
    if (filterTab === "defense") return player.isDefense;
    if (filterTab === "goalies") return player.isGoalie;

    return true;
  });

  return (
    <div className="bg-[#1e293b]/80 rounded-xl shadow-lg border border-white/5 overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-[#334155]/50">
        <h3 className="text-lg font-semibold text-white mb-3">
          Available Players
        </h3>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search players..."
              className="pl-9 bg-[#0f172a]/80 border-[#334155] focus-visible:ring-[#64748b] text-white placeholder:text-slate-500 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="border-[#334155] text-white hover:bg-[#0f172a] rounded-full shadow-sm"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full"
        value={filterTab}
        onValueChange={(value) => setFilterTab(value as FilterTab)}
      >
        <div className="px-4 pt-2">
          <TabsList className="w-full grid grid-cols-4 bg-[#0f172a]/50 rounded-full p-1">
            <TabsTrigger
              value="all"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0f172a] data-[state=active]:shadow-md"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="forwards"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0f172a] data-[state=active]:shadow-md"
            >
              Forwards
            </TabsTrigger>
            <TabsTrigger
              value="defense"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0f172a] data-[state=active]:shadow-md"
            >
              Defense
            </TabsTrigger>
            <TabsTrigger
              value="goalies"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0f172a] data-[state=active]:shadow-md"
            >
              Goalies
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4">
          <PlayerRoster
            players={filteredPlayers}
            onViewDetails={onViewDetails}
            onRemovePlayer={onRemovePlayer}
          />
        </div>
      </Tabs>
    </div>
  );
}
