"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Player } from "@/types/lineup";
import { countries } from "@/data/countries";

interface AddPlayerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPlayer: (player: Omit<Player, "id">) => boolean;
}

export function AddPlayerModal({
  open,
  onOpenChange,
  onAddPlayer,
}: AddPlayerModalProps) {
  console.log("Modal render - open state:", open);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const [positions, setPositions] = useState<string[]>([]);
  const [isForward, setIsForward] = useState(false);
  const [isDefense, setIsDefense] = useState(false);
  const [isGoalie, setIsGoalie] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setNumber("");
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setWeightKg("");
    setWeightLbs("");
    setNationality("");
    setBirthplace("");
    setBirthdate("");
    setAge("");
    setPositions([]);
    setIsForward(false);
    setIsDefense(false);
    setIsGoalie(false);
    setErrors({});
  };

  // Handle position type selection
  const handlePositionTypeChange = (
    type: "forward" | "defense" | "goalie",
    checked: boolean
  ) => {
    if (type === "forward") {
      setIsForward(checked);
      if (checked) {
        setIsGoalie(false);
        // Clear positions if switching types
        if (isDefense || isGoalie) {
          setPositions([]);
        }
      }
    } else if (type === "defense") {
      setIsDefense(checked);
      if (checked) {
        setIsGoalie(false);
        // Clear positions if switching types
        if (isForward || isGoalie) {
          setPositions([]);
        }
      }
    } else if (type === "goalie") {
      setIsGoalie(checked);
      if (checked) {
        setIsForward(false);
        setIsDefense(false);
        setPositions(["G"]);
      }
    }
  };

  // Handle position selection
  const handlePositionChange = (position: string, checked: boolean) => {
    if (checked) {
      setPositions((prev) => [...prev, position]);
    } else {
      setPositions((prev) => prev.filter((p) => p !== position));
    }
  };

  // Convert height between units
  const convertHeight = (value: string, from: "cm" | "ft") => {
    if (!value) return;

    if (from === "cm") {
      const cm = Number.parseFloat(value);
      if (isNaN(cm)) return;

      const inches = cm / 2.54;
      const feet = Math.floor(inches / 12);
      const remainingInches = Math.round(inches % 12);

      setHeightFt(feet.toString());
      setHeightIn(remainingInches.toString());
    } else {
      const ft = Number.parseFloat(heightFt || "0");
      const inch = Number.parseFloat(heightIn || "0");
      if (isNaN(ft) || isNaN(inch)) return;

      const totalInches = ft * 12 + inch;
      const cm = Math.round(totalInches * 2.54);

      setHeightCm(cm.toString());
    }
  };

  // Convert weight between units
  const convertWeight = (value: string, from: "kg" | "lbs") => {
    if (!value) return;

    if (from === "kg") {
      const kg = Number.parseFloat(value);
      if (isNaN(kg)) return;

      const lbs = Math.round(kg * 2.20462);
      setWeightLbs(lbs.toString());
    } else {
      const lbs = Number.parseFloat(value);
      if (isNaN(lbs)) return;

      const kg = Math.round(lbs / 2.20462);
      setWeightKg(kg.toString());
    }
  };

  // Calculate age from birthdate
  const calculateAge = (birthdate: string) => {
    if (!birthdate) return;

    const birthDate = new Date(birthdate);
    const today = new Date();

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    setAge(calculatedAge.toString());
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    if (!number.trim()) {
      newErrors.number = "Jersey number is required";
    } else {
      const num = Number.parseInt(number);
      if (isNaN(num) || num < 1 || num > 99) {
        newErrors.number = "Number must be between 1-99";
      }
    }

    if (!nationality.trim()) newErrors.nationality = "Nationality is required";

    if (positions.length === 0) {
      newErrors.positions = "At least one position is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;

    const player: Omit<Player, "id"> = {
      name: `${firstName} ${lastName}`,
      number: Number.parseInt(number),
      age: Number.parseInt(age),
      nationality,
      positions,
      stats: {},
      height: {
        cm: heightCm ? Number.parseInt(heightCm) : undefined,
        imperial: heightFt ? `${heightFt}'${heightIn}"` : undefined,
      },
      weight: {
        kg: weightKg ? Number.parseInt(weightKg) : undefined,
        lbs: weightLbs ? Number.parseInt(weightLbs) : undefined,
      },
      birthplace,
      birthdate: birthdate ? new Date(birthdate).toISOString() : undefined,
    };

    const success = onAddPlayer(player);
    if (success) {
      handleOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#1e293b] border-[#334155] text-white max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Player
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="grid gap-6 py-4">
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
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
                <Select value={nationality} onValueChange={setNationality}>
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
                <Label htmlFor="heightCm">Height (cm)</Label>
                <Input
                  id="heightCm"
                  value={heightCm}
                  onChange={(e) => {
                    setHeightCm(e.target.value);
                    convertHeight(e.target.value, "cm");
                  }}
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
                    value={heightFt}
                    onChange={(e) => {
                      setHeightFt(e.target.value);
                      convertHeight(e.target.value, "ft");
                    }}
                    className="bg-[#0f172a]/80 border-[#334155] text-white"
                    placeholder="6"
                    type="number"
                  />
                  <Input
                    id="heightIn"
                    value={heightIn}
                    onChange={(e) => {
                      setHeightIn(e.target.value);
                      convertHeight(e.target.value, "ft");
                    }}
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
                  value={weightKg}
                  onChange={(e) => {
                    setWeightKg(e.target.value);
                    convertWeight(e.target.value, "kg");
                  }}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  placeholder="85"
                  type="number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weightLbs">Weight (lbs)</Label>
                <Input
                  id="weightLbs"
                  value={weightLbs}
                  onChange={(e) => {
                    setWeightLbs(e.target.value);
                    convertWeight(e.target.value, "lbs");
                  }}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  placeholder="187"
                  type="number"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthplace">Place of Birth</Label>
                <Input
                  id="birthplace"
                  value={birthplace}
                  onChange={(e) => setBirthplace(e.target.value)}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  placeholder="Toronto, ON"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <Input
                  id="birthdate"
                  value={birthdate}
                  onChange={(e) => {
                    setBirthdate(e.target.value);
                    calculateAge(e.target.value);
                  }}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  type="date"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bg-[#0f172a]/80 border-[#334155] text-white"
                placeholder="25"
                type="number"
              />
            </div>

            <div className="space-y-4">
              <Label className={errors.positions ? "text-red-400" : ""}>
                Position Type*
              </Label>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isForward"
                    checked={isForward}
                    onCheckedChange={(checked) =>
                      handlePositionTypeChange("forward", checked === true)
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
                    checked={isDefense}
                    onCheckedChange={(checked) =>
                      handlePositionTypeChange("defense", checked === true)
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
                    checked={isGoalie}
                    onCheckedChange={(checked) =>
                      handlePositionTypeChange("goalie", checked === true)
                    }
                    className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
                  />
                  <Label htmlFor="isGoalie" className="cursor-pointer">
                    Goalie
                  </Label>
                </div>
              </div>

              {isForward && (
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="posLW"
                      checked={positions.includes("LW")}
                      onCheckedChange={(checked) =>
                        handlePositionChange("LW", checked === true)
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
                      checked={positions.includes("C")}
                      onCheckedChange={(checked) =>
                        handlePositionChange("C", checked === true)
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
                      checked={positions.includes("RW")}
                      onCheckedChange={(checked) =>
                        handlePositionChange("RW", checked === true)
                      }
                      className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
                    />
                    <Label htmlFor="posRW" className="cursor-pointer">
                      Right Wing (RW)
                    </Label>
                  </div>
                </div>
              )}

              {isDefense && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="posLD"
                      checked={positions.includes("LD")}
                      onCheckedChange={(checked) =>
                        handlePositionChange("LD", checked === true)
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
                      checked={positions.includes("RD")}
                      onCheckedChange={(checked) =>
                        handlePositionChange("RD", checked === true)
                      }
                      className="data-[state=checked]:bg-white data-[state=checked]:text-[#0f172a]"
                    />
                    <Label htmlFor="posRD" className="cursor-pointer">
                      Right Defense (RD)
                    </Label>
                  </div>
                </div>
              )}

              {errors.positions && (
                <p className="text-red-400 text-xs">{errors.positions}</p>
              )}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="border-[#334155] text-white hover:bg-[#0f172a]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-white hover:bg-slate-100 text-[#0f172a]"
          >
            Add Player
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
