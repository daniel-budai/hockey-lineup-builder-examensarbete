import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { PlayerFormData } from "@/schemas/player.schema";

interface PlayerPositionSectionProps {
  formData: PlayerFormData;
  onPositionTypeChange: (
    type: "forward" | "defense" | "goalie",
    checked: boolean
  ) => void;
  onPositionChange: (position: string, checked: boolean) => void;
  error?: string;
}

export function PlayerPositionSection({
  formData,
  onPositionTypeChange,
  onPositionChange,
  error,
}: PlayerPositionSectionProps) {
  return (
    <div className="space-y-4">
      <Label className={error ? "text-red-400" : ""}>Position Type*</Label>
      <div className="flex space-x-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isForward"
            checked={formData.isForward}
            onCheckedChange={(checked) =>
              onPositionTypeChange("forward", checked === true)
            }
            className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
          />
          <Label htmlFor="isForward" className="cursor-pointer">
            Forward
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isDefense"
            checked={formData.isDefense}
            onCheckedChange={(checked) =>
              onPositionTypeChange("defense", checked === true)
            }
            className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
          />
          <Label htmlFor="isDefense" className="cursor-pointer">
            Defense
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isGoalie"
            checked={formData.isGoalie}
            onCheckedChange={(checked) =>
              onPositionTypeChange("goalie", checked === true)
            }
            className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
          />
          <Label htmlFor="isGoalie" className="cursor-pointer">
            Goalie
          </Label>
        </div>
      </div>

      {formData.isForward && (
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="posLW"
              checked={formData.positions.includes("LW")}
              onCheckedChange={(checked) =>
                onPositionChange("LW", checked === true)
              }
              className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
            />
            <Label htmlFor="posLW" className="cursor-pointer">
              Left Wing (LW)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="posC"
              checked={formData.positions.includes("C")}
              onCheckedChange={(checked) =>
                onPositionChange("C", checked === true)
              }
              className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
            />
            <Label htmlFor="posC" className="cursor-pointer">
              Center (C)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="posRW"
              checked={formData.positions.includes("RW")}
              onCheckedChange={(checked) =>
                onPositionChange("RW", checked === true)
              }
              className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
            />
            <Label htmlFor="posRW" className="cursor-pointer">
              Right Wing (RW)
            </Label>
          </div>
        </div>
      )}

      {formData.isDefense && (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="posLD"
              checked={formData.positions.includes("LD")}
              onCheckedChange={(checked) =>
                onPositionChange("LD", checked === true)
              }
              className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
            />
            <Label htmlFor="posLD" className="cursor-pointer">
              Left Defense (LD)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="posRD"
              checked={formData.positions.includes("RD")}
              onCheckedChange={(checked) =>
                onPositionChange("RD", checked === true)
              }
              className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
            />
            <Label htmlFor="posRD" className="cursor-pointer">
              Right Defense (RD)
            </Label>
          </div>
        </div>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
