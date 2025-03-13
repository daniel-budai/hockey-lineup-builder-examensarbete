// @/components/lineup/builder/team/action-buttons.tsx
import { Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useModals } from "@/hooks/ui/useModal";
import { useLineup } from "@/hooks/state/useLineup";
import { useTeam } from "@/hooks/state/useTeam";

interface ActionButtonsProps {
  onAddPlayer: () => void;
  onCreateTeam: () => void;
}

export function ActionButtons({
  onAddPlayer,
  onCreateTeam,
}: ActionButtonsProps) {
  const { saveLineup } = useLineup();
  const { currentTeam } = useTeam();

  return (
    <div className="flex space-x-3">
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
        onClick={() => saveLineup(currentTeam._id, currentTeam.name)}
        className="bg-white hover:bg-slate-100 text-[#0f172a] shadow-md hover:shadow-lg transition-all rounded-full"
      >
        <Save className="mr-2 h-4 w-4" />
        Save Lineup
      </Button>
    </div>
  );
}
