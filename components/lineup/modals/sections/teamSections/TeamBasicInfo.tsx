import { TeamFormField } from "../../form-fields/TeamFormField";
import { Input } from "@/components/ui/input";

interface TeamBasicInfoProps {
  formData: any;
  onChange: (data: any) => void;
  errors: Record<string, string>;
  generateAbbreviation: (name: string) => string;
}

export function TeamBasicInfo({
  formData,
  onChange,
  errors,
  generateAbbreviation,
}: TeamBasicInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TeamFormField
        label="Team Name"
        required
        error={errors.name}
        htmlFor="name"
      >
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => {
            onChange({ ...formData, name: e.target.value });
            if (
              !formData.abbreviation ||
              formData.abbreviation === generateAbbreviation(formData.name)
            ) {
              onChange({
                ...formData,
                name: e.target.value,
                abbreviation: generateAbbreviation(e.target.value),
              });
            }
          }}
          className="bg-[#0f172a]/80 border-[#334155] text-white"
          placeholder="Toronto Maple Leafs"
        />
      </TeamFormField>

      <TeamFormField
        label="Abbreviation (max 3 chars)"
        required
        error={errors.abbreviation}
        htmlFor="abbreviation"
      >
        <Input
          id="abbreviation"
          value={formData.abbreviation}
          onChange={(e) =>
            onChange({ ...formData, abbreviation: e.target.value })
          }
          className="bg-[#0f172a]/80 border-[#334155] text-white"
          placeholder="TML"
          maxLength={3}
        />
      </TeamFormField>
    </div>
  );
}
