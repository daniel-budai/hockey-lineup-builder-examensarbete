import { TeamFormField } from "../../form-fields/TeamFormField";
import { Input } from "@/components/ui/input";
import { TeamFormData } from "@/types/team";

interface TeamColorsSectionProps {
  formData: Partial<TeamFormData>;
  onChange: (data: Partial<TeamFormData>) => void;
}

export function TeamColorsSection({
  formData,
  onChange,
}: TeamColorsSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TeamFormField label="Primary Color" htmlFor="primaryColor">
        <div className="flex space-x-2">
          <div
            className="w-10 h-10 rounded border border-[#334155]"
            style={{ backgroundColor: formData.primaryColor }}
          />
          <Input
            id="primaryColor"
            type="color"
            value={formData.primaryColor}
            onChange={(e) =>
              onChange({ ...formData, primaryColor: e.target.value })
            }
            className="bg-[#0f172a]/80 border-[#334155] text-white h-10 w-full"
          />
        </div>
      </TeamFormField>

      <TeamFormField label="Secondary Color" htmlFor="secondaryColor">
        <div className="flex space-x-2">
          <div
            className="w-10 h-10 rounded border border-[#334155]"
            style={{ backgroundColor: formData.secondaryColor }}
          />
          <Input
            id="secondaryColor"
            type="color"
            value={formData.secondaryColor}
            onChange={(e) =>
              onChange({ ...formData, secondaryColor: e.target.value })
            }
            className="bg-[#0f172a]/80 border-[#334155] text-white h-10 w-full"
          />
        </div>
      </TeamFormField>
    </div>
  );
}
