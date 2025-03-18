import { TeamFormData } from "@/hooks/state/useTeamForm";
import { TeamFormField } from "../../form-fields/TeamFormField";
import { Input } from "@/components/ui/input";

interface TeamDetailsInfoProps {
  formData: TeamFormData;
  onChange: (data: TeamFormData) => void;
  errors: Record<string, string>;
}

export function TeamDetailsInfo({
  formData,
  onChange,
  errors,
}: TeamDetailsInfoProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TeamFormField
          label="Founded Year"
          error={errors.foundedYear}
          htmlFor="foundedYear"
        >
          <Input
            id="foundedYear"
            value={formData.foundedYear}
            onChange={(e) =>
              onChange({ ...formData, foundedYear: e.target.value })
            }
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="1917"
            type="number"
            min="1800"
            max={new Date().getFullYear()}
          />
        </TeamFormField>

        <TeamFormField label="Arena/Stadium" htmlFor="arena">
          <Input
            id="arena"
            value={formData.arena}
            onChange={(e) => onChange({ ...formData, arena: e.target.value })}
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="Scotiabank Arena"
          />
        </TeamFormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TeamFormField label="Division" htmlFor="division">
          <Input
            id="division"
            value={formData.division}
            onChange={(e) =>
              onChange({ ...formData, division: e.target.value })
            }
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="Atlantic"
          />
        </TeamFormField>

        <TeamFormField label="Conference" htmlFor="conference">
          <Input
            id="conference"
            value={formData.conference}
            onChange={(e) =>
              onChange({ ...formData, conference: e.target.value })
            }
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="Eastern"
          />
        </TeamFormField>
      </div>
    </>
  );
}
