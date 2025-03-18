// @/components/lineup/builder/team/team-header.tsx
import { TeamSelector } from "@/components/lineup/builder/team/team-selector";

export function TeamHeader() {
  return (
    <div className="flex items-center space-x-3">
      <TeamSelector
        onCreateTeamClick={() => {}} // You can implement this later if needed
      />
    </div>
  );
}
