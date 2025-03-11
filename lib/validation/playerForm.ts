import type { PlayerFormData } from "@/hooks/usePlayerForm";

export function validatePlayerForm(formData: PlayerFormData) {
  const errors: Record<string, string> = {};

  if (!formData.firstName.trim()) errors.firstName = "First name is required";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required";

  if (!formData.number.trim()) {
    errors.number = "Jersey number is required";
  } else {
    const num = Number.parseInt(formData.number);
    if (isNaN(num) || num < 1 || num > 99) {
      errors.number = "Number must be between 1-99";
    }
  }

  if (!formData.nationality.trim())
    errors.nationality = "Nationality is required";
  if (formData.positions.length === 0) {
    errors.positions = "At least one position is required";
  }

  return errors;
}
