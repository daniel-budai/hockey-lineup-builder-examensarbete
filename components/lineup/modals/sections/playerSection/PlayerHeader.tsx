import { Position } from "@/types/positions";

interface PlayerHeaderProps {
  number: number;
  name: string;
  positions: Position[];
}

export function PlayerHeader({ number, name, positions }: PlayerHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="h-16 w-16 rounded-full bg-white text-[#0f172a] flex items-center justify-center text-2xl font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-2xl font-bold">{name}</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {positions?.map((position) => (
            <span
              key={position}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#334155] text-white"
            >
              {position}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
