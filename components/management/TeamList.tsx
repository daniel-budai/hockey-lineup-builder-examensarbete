import type { Team } from "@/types/team";

interface TeamListProps {
  teams: Team[];
  currentTeam: Team | null;
  onSelectTeam: (team: Team) => void;
}

export function TeamList({ teams, currentTeam, onSelectTeam }: TeamListProps) {
  if (!teams || teams.length === 0) {
    return (
      <div className="text-slate-300 text-center py-4">
        No teams created yet. Create your first team!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {teams.map((team) => (
        <button
          key={team._id}
          onClick={() => onSelectTeam(team)}
          className={`w-full text-left p-3 rounded-lg transition ${
            currentTeam?._id === team._id
              ? "bg-[#0f172a] border border-none"
              : "hover:bg-[#0f172a]/50 border border-transparent"
          }`}
        >
          <div className="font-medium text-white">{team.name}</div>
          <div className="text-sm text-slate-300">{team.abbreviation}</div>
        </button>
      ))}
    </div>
  );
}
