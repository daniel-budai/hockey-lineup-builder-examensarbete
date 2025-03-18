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
import type { Player } from "@/types/player";
import type { PlayerFormData } from "@/schemas/player.schema";
import type { Dispatch, SetStateAction } from "react";

interface AddPlayerModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onAddPlayer: (player: Omit<Player, "id">) => boolean;
}

type HandleOpenChangeFunction = (open: boolean) => void;
type HandleSubmitFunction = () => void;

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

  const handleOpenChange: HandleOpenChangeFunction = (open) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  const handleSubmit: HandleSubmitFunction = () => {
    if (!validateForm()) return;

    const player = createPlayerObject();
    const success = onAddPlayer(player);

    if (success) {
      handleOpenChange(false);
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
              formData={formData as PlayerFormData}
              errors={errors}
              onUpdate={
                updateField as <K extends keyof PlayerFormData>(
                  field: K,
                  value: PlayerFormData[K]
                ) => void
              }
              onBirthdateChange={handleBirthdateChange}
            />

            <PhysicalInfoSection
              formData={formData as PlayerFormData}
              onHeightCmChange={handleHeightCmChange}
              onHeightImperialChange={handleHeightImperialChange}
              onWeightKgChange={handleWeightKgChange}
              onWeightLbsChange={handleWeightLbsChange}
            />

            <PlayerPositionSection
              formData={formData as PlayerFormData}
              onPositionTypeChange={handlePositionTypeChange}
              onPositionChange={handlePositionChange}
              error={errors.positions}
            />
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
