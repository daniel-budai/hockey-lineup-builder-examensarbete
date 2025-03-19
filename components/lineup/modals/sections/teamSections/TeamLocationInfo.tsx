import { TeamFormField } from "../../form-fields/TeamFormField";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/countries";
import { TeamFormData } from "@/hooks/state/useTeamForm";

interface TeamLocationInfoProps {
  formData: TeamFormData;
  onChange: (data: TeamFormData) => void;
}

export function TeamLocationInfo({
  formData,
  onChange,
}: TeamLocationInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TeamFormField label="City" htmlFor="city">
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => onChange({ ...formData, city: e.target.value })}
          className="bg-[#0f172a]/80 border-[#334155] text-white"
          placeholder="Toronto"
        />
      </TeamFormField>

      <TeamFormField label="Country" htmlFor="country">
        <Select
          value={formData.country}
          onValueChange={(value) => onChange({ ...formData, country: value })}
        >
          <SelectTrigger className="bg-[#0f172a]/80 border-[#334155] text-white">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent className="bg-[#1e293b] border-[#334155] text-white max-h-80">
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TeamFormField>
    </div>
  );
}
