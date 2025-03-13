import type { Team } from "@/types/team";

interface TeamListProps {
  teams: Team[];
  currentTeam: Team | null;
  onSelectTeam: (team: Team) => void;
}

export function TeamList({ teams, currentTeam, onSelectTeam }: TeamListProps) {
  if (!teams || teams.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
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
              ? "bg-blue-100 border border-blue-500"
              : "hover:bg-gray-100 border border-transparent"
          }`}
        >
          <div className="font-medium">{team.name}</div>
          <div className="text-sm text-gray-500">{team.abbreviation}</div>
        </button>
      ))}
    </div>
  );
}
