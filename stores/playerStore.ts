import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import type { Player } from "@/types/player";
import { useTeamStore } from "./teamStore";

interface PlayerFormData {
  firstName: string;
  lastName: string;
  number: number;
  positions: string[];
  nationality?: string;
  age?: number;
  heightCm?: number;
  heightFt?: number;
  heightIn?: number;
  weightKg?: number;
  weightLbs?: number;
  birthdate?: string;
  birthplace?: string;
  isForward: boolean;
  isDefense: boolean;
  isGoalie: boolean;
}

interface PlayerState {
  players: Player[];
  isLoading: boolean;
  searchQuery: string;
  filterTab: "all" | "forwards" | "defense" | "goalies";
  selectedPlayer: Player | null;
  setSearchQuery: (query: string) => void;
  setFilterTab: (tab: "all" | "forwards" | "defense" | "goalies") => void;
  setSelectedPlayer: (player: Player | null) => void;
  removePlayer: (playerId: string) => void;
  addPlayer: (formData: PlayerFormData) => Promise<void>;
  resetPlayers: () => void;
  fetchPlayers: () => Promise<void>;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      players: [],
      isLoading: false,
      searchQuery: "",
      filterTab: "all",
      selectedPlayer: null,
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterTab: (tab) => set({ filterTab: tab }),
      setSelectedPlayer: (player) => set({ selectedPlayer: player }),
      removePlayer: (playerId) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== playerId),
        })),
      addPlayer: async (formData) => {
        try {
          const currentTeam = useTeamStore.getState().currentTeam;
          if (!currentTeam?._id) {
            toast.error("No team selected");
            throw new Error("No team selected");
          }

          // Transform form data to match API expectations
          const apiData = {
            firstName: formData.firstName, // Required string
            lastName: formData.lastName, // Required string
            number: formData.number.toString(), // Required string (not number)
            positions: [formData.positions[0]], // Required array
            teamId: currentTeam._id, // Required string
            nationality: formData.nationality || "",
            physical: {
              height: {
                metric: formData.heightCm ? Number(formData.heightCm) : 0,
                imperial: formData.heightFt
                  ? `${formData.heightFt}'${formData.heightIn}"`
                  : "",
              },
              weight: {
                metric: formData.weightKg ? Number(formData.weightKg) : 0,
                imperial: formData.weightLbs ? `${formData.weightLbs} lbs` : "",
              },
              birthdate: formData.birthdate || "",
              birthplace: formData.birthplace || "",
            },
            age: formData.age ? formData.age.toString() : "", // String (not number)
            isForward: formData.isForward || false, // Required boolean
            isDefense: formData.isDefense || false, // Required boolean
            isGoalie: formData.isGoalie || false, // Required boolean
            stats: {
              goals: 0,
              assists: 0,
              gamesPlayed: 0,
            },
          };

          console.log("Form Data received:", formData);
          console.log("API Data being sent:", apiData);

          const response = await fetch("/api/player", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiData),
          });

          const responseData = await response.json();
          console.log("Response Status:", response.status);
          console.log("Full API Response:", responseData);

          if (!response.ok) {
            if (responseData.issues) {
              console.log("Validation Issues:", responseData.issues);
              toast.error(
                `Validation failed: ${JSON.stringify(responseData.issues)}`
              );
            }
            throw new Error(responseData.error || "Failed to create player");
          }

          set((state) => ({
            players: [...state.players, responseData.player],
          }));

          toast.success("Player added successfully!");
        } catch (error) {
          console.error("Detailed error in addPlayer:", error);
          toast.error(
            error instanceof Error ? error.message : "Failed to add player"
          );
          throw error;
        }
      },
      resetPlayers: () => set({ players: [] }),
      fetchPlayers: async () => {
        const currentTeam = useTeamStore.getState().currentTeam;
        if (!currentTeam) return;

        try {
          const response = await fetch(`/api/teams/${currentTeam._id}/players`);
          const data = await response.json();
          if (data.success) {
            set({ players: data.players });
          }
        } catch (error) {
          console.error("Failed to fetch players:", error);
        }
      },
    }),
    {
      name: "player-storage",
    }
  )
);
