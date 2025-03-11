import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PlayerFormData } from "@/hooks/usePlayerForm";

interface PhysicalInfoSectionProps {
  formData: PlayerFormData;
  onHeightCmChange: (value: string) => void;
  onHeightImperialChange: (ft: string, inch: string) => void;
  onWeightKgChange: (value: string) => void;
  onWeightLbsChange: (value: string) => void;
}

export function PhysicalInfoSection({
  formData,
  onHeightCmChange,
  onHeightImperialChange,
  onWeightKgChange,
  onWeightLbsChange,
}: PhysicalInfoSectionProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heightCm">Height (cm)</Label>
          <Input
            id="heightCm"
            value={formData.heightCm}
            onChange={(e) => onHeightCmChange(e.target.value)}
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="185"
            type="number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heightFt">Height (ft/in)</Label>
          <div className="flex space-x-2">
            <Input
              id="heightFt"
              value={formData.heightFt}
              onChange={(e) =>
                onHeightImperialChange(e.target.value, formData.heightIn)
              }
              className="bg-[#0f172a]/80 border-[#334155] text-white"
              placeholder="6"
              type="number"
            />
            <Input
              id="heightIn"
              value={formData.heightIn}
              onChange={(e) =>
                onHeightImperialChange(formData.heightFt, e.target.value)
              }
              className="bg-[#0f172a]/80 border-[#334155] text-white"
              placeholder="1"
              type="number"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weightKg">Weight (kg)</Label>
          <Input
            id="weightKg"
            value={formData.weightKg}
            onChange={(e) => onWeightKgChange(e.target.value)}
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="85"
            type="number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weightLbs">Weight (lbs)</Label>
          <Input
            id="weightLbs"
            value={formData.weightLbs}
            onChange={(e) => onWeightLbsChange(e.target.value)}
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="187"
            type="number"
          />
        </div>
      </div>
    </>
  );
}
