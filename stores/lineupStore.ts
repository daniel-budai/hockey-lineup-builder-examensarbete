import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import type { LineupData, Position, CreateLineupDTO } from "@/types/lineup";
import type { Player } from "@/types/player";
import { useTeamStore } from "./teamStore";

const emptyLineup: LineupData = {
  teamId: "",
  name: "",
  line1: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line2: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line3: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
  line4: { LW: null, C: null, RW: null, LD: null, RD: null, G: null },
};

interface LineupState {
  lineup: LineupData;
  activeTab: "line1" | "line2" | "line3" | "line4";
  hoveredTab: string | null;
  targetLine: string | null;
  setLineup: (lineup: LineupData) => void;
  setActiveTab: (tab: LineupState["activeTab"]) => void;
  setHoveredTab: (tab: string | null) => void;
  setTargetLine: (line: string | null) => void;
  saveLineup: () => Promise<void>;
  loadLineup: () => void;
  isPositionValid: (player: Player, position: Position) => boolean;
  resetLineup: () => void;
}

export const useLineupStore = create<LineupState>()(
  persist(
    (set, get) => ({
      lineup: emptyLineup,
      activeTab: "line1" as LineupState["activeTab"],
      hoveredTab: null,
      targetLine: null,

      setLineup: (lineup: LineupData) => {
        const { currentTeam } = useTeamStore.getState();
        if (currentTeam) {
          set({
            lineup: {
              ...lineup,
              teamId: currentTeam._id,
              name: lineup.name || `${currentTeam.name} Lineup`,
            },
          });
        } else {
          set({ lineup });
        }
      },
      setActiveTab: (tab: LineupState["activeTab"]) => set({ activeTab: tab }),
      setHoveredTab: (tab: string | null) => set({ hoveredTab: tab }),
      setTargetLine: (line: string | null) => set({ targetLine: line }),

      saveLineup: async () => {
        const { currentTeam } = useTeamStore.getState();
        if (!currentTeam) {
          toast.error("No team selected");
          return;
        }

        try {
          const { lineup } = get();
          const lineupToSave: CreateLineupDTO = {
            ...lineup,
            teamId: currentTeam._id,
            name: `${
              currentTeam.name
            } Lineup - ${new Date().toLocaleDateString()}`,
          };

          console.log("Saving lineup:", lineupToSave);

          const response = await fetch("/api/lineup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lineupToSave),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to save lineup");
          }

          const savedLineup = await response.json();
          set({ lineup: savedLineup });
          toast.success(
            `${currentTeam.name} lineup has been saved successfully.`
          );
        } catch (error) {
          console.error("Error saving lineup:", error);
          toast.error("Failed to save lineup. Please try again.");
        }
      },

      loadLineup: async () => {
        const { currentTeam } = useTeamStore.getState();
        if (!currentTeam) return;

        try {
          // Update the URL to use query parameter
          const response = await fetch(`/api/lineup?teamId=${currentTeam._id}`);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const lineups = await response.json();

          if (Array.isArray(lineups) && lineups.length > 0) {
            // Use the most recent lineup (first in the array since we sort by -createdAt)
            set({ lineup: lineups[0] });
          } else {
            // If no lineup exists, create an empty one
            set({
              lineup: {
                ...emptyLineup,
                teamId: currentTeam._id,
                name: `${currentTeam.name} Lineup`,
              },
            });
          }
        } catch (error) {
          console.error("Failed to load lineup:", error);
          // Create an empty lineup as fallback
          set({
            lineup: {
              ...emptyLineup,
              teamId: currentTeam._id,
              name: `${currentTeam.name} Lineup`,
            },
          });
          toast.error("Failed to load lineup, created empty lineup instead");
        }
      },

      isPositionValid: (player: Player, position: Position) => {
        return player.positions.includes(position);
      },

      resetLineup: () => {
        set({ lineup: emptyLineup });
      },
    }),
    {
      name: "hockey-lineup-storage",
      partialize: (state) => ({
        lineup: state.lineup,
      }),
    }
  )
);
