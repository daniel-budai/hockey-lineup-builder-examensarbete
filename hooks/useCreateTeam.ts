import { toast } from "sonner";

export function useCreateTeam() {
  const handleCreateTeam = async (teamData: CreateTeamDTO) => {
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) throw new Error("Failed to create team");

      const data = await response.json();
      if (data.success) {
        toast.success("Team created successfully!");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Failed to create team");
      console.error(error);
      return false;
    }
  };

  return { handleCreateTeam };
}
