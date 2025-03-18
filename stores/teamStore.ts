import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import type { Team, CreateTeamDTO } from "@/types/team";

interface TeamState {
  teams: Team[];
  currentTeam: Team | null;
  isLoading: boolean;
  fetchTeams: () => Promise<void>;
  selectTeam: (team: Team) => void;
  createTeam: (teamData: CreateTeamDTO) => Promise<boolean>;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set, get) => ({
      teams: [],
      currentTeam: null,
      isLoading: false,

      fetchTeams: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch("/api/teams");
          const data = await response.json();

          if (data.success) {
            set({ teams: data.teams });
            const { currentTeam } = get();
            if (!currentTeam && data.teams.length > 0) {
              set({ currentTeam: data.teams[0] });
            }
          } else {
            toast.error(data.error || "Failed to fetch teams");
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while fetching teams");
        } finally {
          set({ isLoading: false });
        }
      },

      selectTeam: (team: Team) => {
        console.log("Selecting team:", team);
        set({ currentTeam: team });
      },

      createTeam: async (teamData: CreateTeamDTO) => {
        try {
          const response = await fetch("/api/teams", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(teamData),
          });

          const data = await response.json();

          if (data.success) {
            toast.success("Team created successfully!");
            get().fetchTeams();
            return true;
          } else {
            toast.error(data.error || "Failed to create team");
            return false;
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while creating the team");
          return false;
        }
      },
    }),
    {
      name: "hockey-team-storage",
    }
  )
);
