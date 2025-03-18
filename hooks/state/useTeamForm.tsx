import { useState } from "react";
import { toast } from "sonner";
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

    const teamData = {
      ...formData,
      abbreviation: formData.abbreviation.toUpperCase(),
      foundedYear: formData.foundedYear
        ? Number(formData.foundedYear)
        : undefined,
      logoUrl: undefined,
    };

    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Team created successfully!");
        if (onTeamCreated && data.team) {
          onTeamCreated(data.team);
        }
        return true;
      } else {
        toast.error(data.error || "Failed to create team");
        return false;
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("An error occurred while creating the team");
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
