import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/countries";
import type { PlayerFormData } from "@/schemas/player.schema";

interface PersonalInfoSectionProps {
  formData: PlayerFormData;
  errors: Record<string, string>;
  onUpdate: <K extends keyof PlayerFormData>(
    field: K,
    value: PlayerFormData[K]
  ) => void;
  onBirthdateChange: (value: string) => void;
}

export function PersonalInfoSection({
  formData,
  errors,
  onUpdate,
  onBirthdateChange,
}: PersonalInfoSectionProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className={errors.firstName ? "text-red-400" : ""}
          >
            First Name*
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) =>
              onUpdate(
                "firstName",
                e.target.value as PlayerFormData["firstName"]
              )
            }
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red-400 text-xs">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className={errors.lastName ? "text-red-400" : ""}
          >
            Last Name*
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) =>
              onUpdate("lastName", e.target.value as PlayerFormData["lastName"])
            }
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-red-400 text-xs">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="number"
            className={errors.number ? "text-red-400" : ""}
          >
            Jersey Number* (1-99)
          </Label>
          <Input
            id="number"
            value={formData.number}
            onChange={(e) =>
              onUpdate("number", e.target.value as PlayerFormData["number"])
            }
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="88"
            type="number"
            min="1"
            max="99"
          />
          {errors.number && (
            <p className="text-red-400 text-xs">{errors.number}</p>
          )}
        </div>

        <div className="space-y-2 col-span-2">
          <Label
            htmlFor="nationality"
            className={errors.nationality ? "text-red-400" : ""}
          >
            Nationality*
          </Label>
          <Select
            value={formData.nationality}
            onValueChange={(value) =>
              onUpdate("nationality", value as PlayerFormData["nationality"])
            }
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
          {errors.nationality && (
            <p className="text-red-400 text-xs">{errors.nationality}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="birthplace">Place of Birth</Label>
          <Input
            id="birthplace"
            value={formData.birthplace}
            onChange={(e) =>
              onUpdate(
                "birthplace",
                e.target.value as PlayerFormData["birthplace"]
              )
            }
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            placeholder="Toronto, ON"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthdate">Date of Birth</Label>
          <Input
            id="birthdate"
            value={
              formData.birthdate
                ? formData.birthdate.toString().split("T")[0]
                : ""
            }
            onChange={(e) => onBirthdateChange(e.target.value)}
            className="bg-[#0f172a]/80 border-[#334155] text-white"
            type="date"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          value={formData.age}
          onChange={(e) =>
            onUpdate("age", e.target.value as PlayerFormData["age"])
          }
          className="bg-[#0f172a]/80 border-[#334155] text-white"
          placeholder="25"
          type="number"
        />
      </div>
    </>
  );
}
