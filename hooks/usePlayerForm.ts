import { useState } from "react";
import type { Player } from "@/types/lineup";
import {
  convertHeight,
  convertWeight,
  calculateAge,
} from "@/lib/utils/conversions";
import { validatePlayerForm } from "@/lib/validation/playerForm";

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
      updateField("positions", [...formData.positions, position]);
    } else {
      updateField(
        "positions",
        formData.positions.filter((p) => p !== position)
      );
    }
  };

  const validateForm = () => {
    const newErrors = validatePlayerForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const createPlayerObject = (): Omit<Player, "id"> => {
    return {
      name: `${formData.firstName} ${formData.lastName}`,
      number: Number.parseInt(formData.number),
      age: formData.age ? Number.parseInt(formData.age) : undefined,
      nationality: formData.nationality,
      positions: formData.positions,
      stats: {},
      height: {
        cm: formData.heightCm ? Number.parseInt(formData.heightCm) : undefined,
        imperial: formData.heightFt
          ? `${formData.heightFt}'${formData.heightIn}"`
          : undefined,
      },
      weight: {
        kg: formData.weightKg ? Number.parseInt(formData.weightKg) : undefined,
        lbs: formData.weightLbs
          ? Number.parseInt(formData.weightLbs)
          : undefined,
      },
      birthplace: formData.birthplace || undefined,
      birthdate: formData.birthdate
        ? new Date(formData.birthdate).toISOString()
        : undefined,
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
