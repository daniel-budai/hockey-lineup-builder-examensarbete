import { useState } from "react";
import type { CreatePlayerDTO } from "@/types/player";
import type { Position } from "@/types/lineup";
import type { PlayerStats } from "@/types/common";
import {
  convertHeight,
  convertWeight,
  calculateAge,
} from "@/lib/utils/conversions";
import { playerFormSchema } from "@/schemas/player.schema";
import { useTeamStore } from "@/stores/teamStore";

export interface PlayerFormData {
  firstName: string;
  lastName: string;
  number: string;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  weightKg: string;
  weightLbs: string;
  nationality: string;
  birthplace: string;
  birthdate: string;
  age: string;
  positions: string[];
  isForward: boolean;
  isDefense: boolean;
  isGoalie: boolean;
}

export function usePlayerForm() {
  const [formData, setFormData] = useState<PlayerFormData>({
    firstName: "",
    lastName: "",
    number: "",
    heightCm: "",
    heightFt: "",
    heightIn: "",
    weightKg: "",
    weightLbs: "",
    nationality: "",
    birthplace: "",
    birthdate: "",
    age: "",
    positions: [],
    isForward: false,
    isDefense: false,
    isGoalie: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = <K extends keyof PlayerFormData>(
    field: K,
    value: PlayerFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleHeightCmChange = (value: string) => {
    updateField("heightCm", value);
    if (value) {
      const { feet, inches } = convertHeight.cmToImperial(value);
      updateField("heightFt", feet);
      updateField("heightIn", inches);
    }
  };

  const handleHeightImperialChange = (ft: string, inch: string) => {
    updateField("heightFt", ft);
    updateField("heightIn", inch);
    const cm = convertHeight.imperialToCm(ft, inch);
    updateField("heightCm", cm);
  };

  const handleWeightKgChange = (value: string) => {
    updateField("weightKg", value);
    const lbs = convertWeight.kgToLbs(value);
    updateField("weightLbs", lbs);
  };

  const handleWeightLbsChange = (value: string) => {
    updateField("weightLbs", value);
    const kg = convertWeight.lbsToKg(value);
    updateField("weightKg", kg);
  };

  const handleBirthdateChange = (value: string) => {
    updateField("birthdate", value);
    const age = calculateAge(value);
    updateField("age", age);
  };

  const handlePositionTypeChange = (
    type: "forward" | "defense" | "goalie",
    checked: boolean
  ) => {
    if (type === "forward") {
      updateField("isForward", checked);
      if (checked) {
        updateField("isGoalie", false);
        updateField("isDefense", false);
        updateField("positions", []);
      }
    } else if (type === "defense") {
      updateField("isDefense", checked);
      if (checked) {
        updateField("isForward", false);
        updateField("isGoalie", false);
        updateField("positions", []);
      }
    } else if (type === "goalie") {
      updateField("isGoalie", checked);
      if (checked) {
        updateField("isForward", false);
        updateField("isDefense", false);
        updateField("positions", ["G"]);
      }
    }
  };

  const handlePositionChange = (position: string, checked: boolean) => {
    if (checked) {
      updateField("positions", [position]);
    } else {
      updateField(
        "positions",
        formData.positions.filter((p) => p !== position)
      );
    }
  };

  const validateForm = () => {
    const result = playerFormSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach(
        (issue: { path: (string | number)[]; message: string }) => {
          const path = issue.path.join(".");
          newErrors[path] = issue.message;
        }
      );

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      number: "",
      heightCm: "",
      heightFt: "",
      heightIn: "",
      weightKg: "",
      weightLbs: "",
      nationality: "",
      birthplace: "",
      birthdate: "",
      age: "",
      positions: [],
      isForward: false,
      isDefense: false,
      isGoalie: false,
    });
    setErrors({});
  };

  const createPlayerObject = () => {
    const currentTeam = useTeamStore.getState().currentTeam;

    return {
      firstName: formData.firstName,
      lastName: formData.lastName,
      number: Number(formData.number),
      positions: formData.positions,
      team: currentTeam._id,
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
      age: formData.age ? Number(formData.age) : 0,
      isForward: formData.isForward,
      isDefense: formData.isDefense,
      isGoalie: formData.isGoalie,
      stats: {
        goals: 0,
        assists: 0,
        points: 0,
        plusMinus: 0,
        gamesPlayed: 0,
      },
    };
  };

  return {
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
    setErrors,
  };
}
