import { useState } from "react";
import { toast } from "sonner";
import { teamService } from "@/services/api/teamService";
import { teamSchema } from "@/schemas/team.schema";
import type { Team } from "@/types/team";

export interface TeamFormData {
  name: string;
  abbreviation: string;
  city: string;
  country: string;
  foundedYear: string;
  arena: string;
  division: string;
  conference: string;
  primaryColor: string;
  secondaryColor: string;
}

export function useTeamForm() {
  const [formData, setFormData] = useState<TeamFormData>({
    name: "",
    abbreviation: "",
    city: "",
    country: "",
    foundedYear: "",
    arena: "",
    division: "",
    conference: "",
    primaryColor: "#0f172a",
    secondaryColor: "#ffffff",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const teamData = {
      ...formData,
      abbreviation: formData.abbreviation.toUpperCase(),
      foundedYear: formData.foundedYear
        ? Number(formData.foundedYear)
        : undefined,
    };

    const result = teamSchema.safeParse(teamData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        newErrors[field] = issue.message;
      });

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (onTeamCreated?: (team: Team) => void) => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const teamData = {
        ...formData,
        abbreviation: formData.abbreviation.toUpperCase(),
        foundedYear: formData.foundedYear
          ? Number(formData.foundedYear)
          : undefined,
        logoUrl: undefined,
      };

      const team = await teamService.createTeam(teamData);
      toast.success("Team created successfully!");
      if (onTeamCreated) {
        onTeamCreated(team);
      }
      return true;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create team"
      );
      console.error("Error creating team:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      abbreviation: "",
      city: "",
      country: "",
      foundedYear: "",
      arena: "",
      division: "",
      conference: "",
      primaryColor: "#0f172a",
      secondaryColor: "#ffffff",
    });
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    handleSubmit,
    resetForm,
  };
}
