import { useState } from "react";
import {
  convertHeight,
  convertWeight,
  calculateAge,
} from "@/lib/utils/conversions";
import { playerFormSchema } from "@/schemas/player.schema";
import type { Position } from "@/types/positions";

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
  teamId?: string;
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
        // Clear positions if switching types
        if (formData.isDefense || formData.isGoalie) {
          updateField("positions", []);
        }
      }
    } else if (type === "defense") {
      updateField("isDefense", checked);
      if (checked) {
        updateField("isGoalie", false);
        // Clear positions if switching types
        if (formData.isForward || formData.isGoalie) {
          updateField("positions", []);
        }
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
      updateField("positions", [...formData.positions, position as Position]);
    } else {
      updateField(
        "positions",
        formData.positions.filter((p) => p !== position)
      );
    }
  };

  const validateForm = (dataToValidate = formData) => {
    console.log("Validating form data:", dataToValidate);

    const result = playerFormSchema.safeParse(dataToValidate);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        newErrors[path] = issue.message;
      });

      console.log("Validation errors:", newErrors);
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
    const teamId = localStorage.getItem("selectedTeamId");

    const player = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      number: formData.number,
      positions: formData.positions,
      teamId,
      isForward: formData.isForward,
      isDefense: formData.isDefense,
      isGoalie: formData.isGoalie,
      nationality: formData.nationality,
      birthdate: formData.birthdate,
      heightCm: formData.heightCm,
      heightFt: formData.heightFt,
      heightIn: formData.heightIn,
      weightKg: formData.weightKg,
      weightLbs: formData.weightLbs,
      birthplace: formData.birthplace,
      age: formData.age,
    };

    console.log("Creating player with data:", player);
    return player;
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
