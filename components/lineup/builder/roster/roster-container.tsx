// @/components/lineup/builder/roster/roster-container.tsx
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerRoster } from "@/components/lineup/builder/roster/player-roster";
import { usePlayers } from "@/hooks/state/usePlayers";
import { useLineup } from "@/hooks/state/useLineup";
import { PlayerCard } from "@/components/lineup/builder/roster/player-card";

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
  const { lineup } = useLineup();

  const filteredPlayers = allPlayers.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.positions?.some((pos) =>
        pos.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      (player.nationality &&
        player.nationality.toLowerCase().includes(searchQuery.toLowerCase())) ||
      player.number.toString().includes(searchQuery);

    if (!matchesSearch) return false;

    if (filterTab === "all") return true;
    if (filterTab === "forwards")
      return player.positions?.some((pos) => ["LW", "C", "RW"].includes(pos));
    if (filterTab === "defense")
      return player.positions?.some((pos) => ["LD", "RD"].includes(pos));
    if (filterTab === "goalies") return player.positions?.includes("G");

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
        onValueChange={setFilterTab}
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
