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
import type { Team } from "@/types/team";
import { useTeamForm } from "@/hooks/state/useTeamForm";
import { TeamBasicInfo } from "./sections/teamSections/TeamBasicInfo";
import { TeamLocationInfo } from "./sections/teamSections/TeamLocationInfo";
import { TeamDetailsInfo } from "./sections/teamSections/TeamDetailsInfo";
import { TeamColorsSection } from "./sections/teamSections/TeamColorsSection";
import { TeamPreview } from "./sections/teamSections/TeamPreview";

interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeamCreated?: (team: Team) => void;
}

export function CreateTeamModal({
  open,
  onOpenChange,
  onTeamCreated,
}: CreateTeamModalProps) {
  const {
    formData,
    setFormData,
    errors,
    isSubmitting,
    handleSubmit,
    resetForm,
  } = useTeamForm();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  const generateAbbreviation = (teamName: string) => {
    if (!teamName) return "";
    const words = teamName.split(" ");
    if (words.length === 1) {
      return teamName.substring(0, 3).toUpperCase();
    }
    return words
      .slice(0, 3)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleFormSubmit = async () => {
    const success = await handleSubmit(onTeamCreated);
    if (success) {
      handleOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#1e293b] border-[#334155] text-white max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Team
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="grid gap-6 py-4">
            <TeamBasicInfo
              formData={formData}
              onChange={setFormData}
              errors={errors}
              generateAbbreviation={generateAbbreviation}
            />
            <TeamLocationInfo formData={formData} onChange={setFormData} />
            <TeamDetailsInfo
              formData={formData}
              onChange={setFormData}
              errors={errors}
            />
            <TeamColorsSection formData={formData} onChange={setFormData} />
            <TeamPreview formData={formData} />
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="border-[#334155] text-white hover:bg-[#0f172a]"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFormSubmit}
            className="bg-white hover:bg-slate-100 text-[#0f172a]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
