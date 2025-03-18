import { Position } from "@/types/positions";
import type { Player } from "@/types/player";

interface PlayerStatsProps {
  stats: Player["stats"];
  positions: Position[];
}

export function PlayerStats({ stats, positions }: PlayerStatsProps) {
  if (!stats || Object.keys(stats).length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold border-b border-[#334155] pb-2 mb-3">
        Statistics
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {positions?.includes("G") ? (
          <GoalieStats stats={stats} />
        ) : (
          <PlayerFieldStats stats={stats} />
        )}
        {stats.gamesPlayed !== undefined && (
          <StatField label="Games Played" value={stats.gamesPlayed} />
        )}
      </div>
    </div>
  );
}

function GoalieStats({ stats }: { stats: Player["stats"] }) {
  return (
    <>
      {stats.savePercentage !== undefined && (
        <StatField
          label="Save Percentage"
          value={stats.savePercentage.toFixed(3)}
        />
      )}
      {stats.goalsAgainstAverage !== undefined && (
        <StatField label="GAA" value={stats.goalsAgainstAverage.toFixed(2)} />
      )}
    </>
  );
}

function PlayerFieldStats({ stats }: { stats: Player["stats"] }) {
  return (
    <>
      {stats.goals !== undefined && (
        <StatField label="Goals" value={stats.goals} />
      )}
      {stats.assists !== undefined && (
        <StatField label="Assists" value={stats.assists} />
      )}
      {stats.points !== undefined && (
        <StatField label="Points" value={stats.points} />
      )}
      {stats.plusMinus !== undefined && (
        <StatField label="+/-" value={stats.plusMinus} />
      )}
    </>
  );
}

function StatField({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-400">{label}</h4>
      <p className="text-white text-lg font-semibold">{value}</p>
    </div>
  );
}
