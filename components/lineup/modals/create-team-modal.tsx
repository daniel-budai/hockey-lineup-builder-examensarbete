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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { countries } from "@/data/countries";
import type { Team } from "@/types/team";
import { toast } from "sonner";

interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeamCreated?: (team: Team) => void;
}

export function CreateTeamModal({
  open,
  onOpenChange,
  onTeamCreated,
}: CreateTeamModalProps) {
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [arena, setArena] = useState("");
  const [division, setDivision] = useState("");
  const [conference, setConference] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#0f172a");
  const [secondaryColor, setSecondaryColor] = useState("#ffffff");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("Modal props received:", { open, onOpenChange, onTeamCreated });
  console.log("onTeamCreated type:", typeof onTeamCreated);

  // Reset form when modal closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  const resetForm = () => {
    setName("");
    setAbbreviation("");
    setCity("");
    setCountry("");
    setFoundedYear("");
    setArena("");
    setDivision("");
    setConference("");
    setPrimaryColor("#0f172a");
    setSecondaryColor("#ffffff");
    setErrors({});
    setIsSubmitting(false);
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Team name is required";

    if (!abbreviation.trim()) {
      newErrors.abbreviation = "Team abbreviation is required";
    } else if (abbreviation.length > 3) {
      newErrors.abbreviation = "Abbreviation must be 3 characters or less";
    }

    if (
      foundedYear &&
      (isNaN(Number(foundedYear)) ||
        Number(foundedYear) < 1800 ||
        Number(foundedYear) > new Date().getFullYear())
    ) {
      newErrors.foundedYear = `Year must be between 1800 and ${new Date().getFullYear()}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission - now directly creates the team
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const teamData = {
      name,
      abbreviation: abbreviation.toUpperCase(),
      city: city || undefined,
      country: country || undefined,
      foundedYear: foundedYear ? Number(foundedYear) : undefined,
      arena: arena || undefined,
      division: division || undefined,
      conference: conference || undefined,
      primaryColor,
      secondaryColor,
      logoUrl: undefined,
    };

    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Team created successfully!");

        // Notify parent component if callback provided
        if (onTeamCreated && data.team) {
          onTeamCreated(data.team);
        }

        // Close modal
        handleOpenChange(false);
      } else {
        toast.error(data.error || "Failed to create team");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("An error occurred while creating the team");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate abbreviation from team name
  const generateAbbreviation = (teamName: string) => {
    if (!teamName) return "";

    // Split by spaces and get first letter of each word
    const words = teamName.split(" ");
    if (words.length === 1) {
      // If single word, take first 3 letters
      return teamName.substring(0, 3).toUpperCase();
    } else {
      // Take first letter of each word, up to 3
      return words
        .slice(0, 3)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#1e293b] border-[#334155] text-white max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Team
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className={errors.name ? "text-red-400" : ""}
                >
                  Team Name*
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (
                      !abbreviation ||
                      abbreviation === generateAbbreviation(name)
                    ) {
                      setAbbreviation(generateAbbreviation(e.target.value));
                    }
                  }}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  placeholder="Toronto Maple Leafs"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="abbreviation"
                  className={errors.abbreviation ? "text-red-400" : ""}
                >
                  Abbreviation* (max 3 chars)
                </Label>
                <Input
                  id="abbreviation"
                  value={abbreviation}
                  onChange={(e) => setAbbreviation(e.target.value)}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  placeholder="TML"
                  maxLength={3}
                />
                {errors.abbreviation && (
                  <p className="text-red-400 text-xs">{errors.abbreviation}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  placeholder="Toronto"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={setCountry}>
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
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="foundedYear"
                  className={errors.foundedYear ? "text-red-400" : ""}
                >
                  Founded Year
                </Label>
                <Input
                  id="foundedYear"
                  value={foundedYear}
                  onChange={(e) => setFoundedYear(e.target.value)}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  placeholder="1917"
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                />
                {errors.foundedYear && (
                  <p className="text-red-400 text-xs">{errors.foundedYear}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="arena">Arena/Stadium</Label>
                <Input
                  id="arena"
                  value={arena}
                  onChange={(e) => setArena(e.target.value)}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  placeholder="Scotiabank Arena"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="division">Division</Label>
                <Input
                  id="division"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  placeholder="Atlantic"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conference">Conference</Label>
                <Input
                  id="conference"
                  value={conference}
                  onChange={(e) => setConference(e.target.value)}
                  className="bg-[#0f172a]/80 border-[#334155] text-white"
                  placeholder="Eastern"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex space-x-2">
                  <div
                    className="w-10 h-10 rounded border border-[#334155]"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <Input
                    id="primaryColor"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="bg-[#0f172a]/80 border-[#334155] text-white h-10 w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex space-x-2">
                  <div
                    className="w-10 h-10 rounded border border-[#334155]"
                    style={{ backgroundColor: secondaryColor }}
                  />
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="bg-[#0f172a]/80 border-[#334155] text-white h-10 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Team Preview</Label>
              <div className="flex items-center space-x-4 p-4 bg-[#0f172a]/50 rounded-lg">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                >
                  {abbreviation || "HC"}
                </div>
                <div className="text-xl font-bold">{name || "Hockey Club"}</div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="border-[#334155] text-white hover:bg-[#0f172a]"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-white hover:bg-slate-100 text-[#0f172a]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
