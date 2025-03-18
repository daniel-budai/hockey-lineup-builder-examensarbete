"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerForm } from "@/hooks/usePlayerForm";
import { PersonalInfoSection } from "@/components/lineup/modals/sections/PersonalInfo-Section";
import { PhysicalInfoSection } from "@/components/lineup/modals/sections/PhysicalInfomation-section";
import { PlayerPositionSection } from "@/components/lineup/modals/sections/PlayerPositionSection";
import type { CreatePlayerDTO } from "@/types/player";
import { usePlayerStore } from "@/stores/playerStore";
import { Checkbox } from "@/components/ui/checkbox";

interface AddPlayerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPlayer: (player: CreatePlayerDTO) => Promise<void>;
}

export function AddPlayerModal({
  open,
  onOpenChange,
  onAddPlayer,
}: AddPlayerModalProps) {
  const {
    formData,
    errors,
    updateField,
    handleHeightCmChange,
    handleHeightImperialChange,
    handleWeightKgChange,
    handleWeightLbsChange,
    handleBirthdateChange,
    handlePositionTypeChange,
    handlePositionChange,
    validateForm,
    createPlayerObject,
    resetForm,
  } = usePlayerForm();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const player = createPlayerObject();

    // Verify all required fields are present
    if (
      !player.firstName ||
      !player.lastName ||
      !player.number ||
      !player.positions?.length
    ) {
      console.error("Missing required fields:", {
        firstName: player.firstName,
        lastName: player.lastName,
        number: player.number,
        positions: player.positions,
      });
      return;
    }

    try {
      await onAddPlayer(player);
      handleOpenChange(false);
    } catch (error) {
      console.error("Failed to add player:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#1e293b] border-[#334155] text-white max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Player
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="grid gap-6 py-4">
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              onUpdate={updateField}
              onBirthdateChange={handleBirthdateChange}
            />

            <PhysicalInfoSection
              formData={formData}
              onHeightCmChange={handleHeightCmChange}
              onHeightImperialChange={handleHeightImperialChange}
              onWeightKgChange={handleWeightKgChange}
              onWeightLbsChange={handleWeightLbsChange}
            />

            <PlayerPositionSection
              formData={formData}
              onPositionTypeChange={handlePositionTypeChange}
              onPositionChange={handlePositionChange}
              error={errors.positions}
            />

            <div className="flex gap-4">
              <Checkbox
                checked={formData.isForward}
                onCheckedChange={(checked) =>
                  handlePositionTypeChange("forward", checked)
                }
              />
              <Checkbox
                checked={formData.isDefense}
                onCheckedChange={(checked) =>
                  handlePositionTypeChange("defense", checked)
                }
              />
              <Checkbox
                checked={formData.isGoalie}
                onCheckedChange={(checked) =>
                  handlePositionTypeChange("goalie", checked)
                }
              />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="border-[#334155] text-white hover:bg-[#0f172a]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-white hover:bg-slate-100 text-[#0f172a]"
          >
            Add Player
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
