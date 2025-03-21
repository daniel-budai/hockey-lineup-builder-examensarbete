// @/components/lineup/builder/team/action-buttons.tsx
import { Plus, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLineup } from "@/hooks/state/useLineup";
import { useTeam } from "@/hooks/state/useTeam";

interface ActionButtonsProps {
  onAddPlayer: () => void;
  onCreateTeam: () => void;
  onResetLineup: () => void;
}

export function ActionButtons({
  onAddPlayer,
  onCreateTeam,
  onResetLineup,
}: ActionButtonsProps) {
  const { saveLineup } = useLineup();
  const { currentTeam } = useTeam();

  const handleSaveLineup = () => {
    if (!currentTeam) {
      return;
    }
    saveLineup(currentTeam._id, currentTeam.name);
  };

  return (
    <div className="grid grid-cols-2 sm:flex gap-2 sm:space-x-3">
      <Button
        onClick={onAddPlayer}
        className="bg-[#1e293b] hover:bg-[#334155] text-white shadow-md hover:shadow-lg transition-all rounded-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Player
      </Button>
      <Button
        onClick={onCreateTeam}
        className="bg-[#1e293b] hover:bg-[#334155] text-white shadow-md hover:shadow-lg transition-all rounded-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Create Team
      </Button>
      <Button
        onClick={handleSaveLineup}
        disabled={!currentTeam}
        className="bg-white hover:bg-slate-100 text-[#0f172a] shadow-md hover:shadow-lg transition-all rounded-full"
      >
        <Save className="mr-2 h-4 w-4" />
        Save Lineup
      </Button>
      <Button
        onClick={onResetLineup}
        className="bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all rounded-full"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Reset Lineup
      </Button>
    </div>
  );
}
