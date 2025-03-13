import { useState } from "react";
import { toast } from "sonner";

export function useCreateTeam() {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTeam = async (teamData) => {
    try {
      setIsCreating(true);
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Team created successfully!");
        return true;
      } else {
        toast.error(data.error || "Failed to create team");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while creating the team");
      console.error(error);
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    isCreating,
    handleCreateTeam,
  };
}
