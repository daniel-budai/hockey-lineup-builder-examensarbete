// components/profile/account-information.tsx
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Save, X } from "lucide-react";
import InfoItem from "@/components/profile/info-item";

export default function AccountInformation() {
  const {
    profile,
    isLoading,
    isEditing,
    editForm,
    startEditing,
    cancelEditing,
    updateField,
    saveChanges,
  } = useProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="bg-[#1e293b]/80 border-[#334155] text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Account Information</CardTitle>
          <p className="text-sm text-slate-400 mt-1">
            Update your personal details
          </p>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            className="border-[#334155] text-white hover:bg-[#0f172a]"
            onClick={startEditing}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#334155] text-white hover:bg-[#0f172a]"
              onClick={cancelEditing}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-white hover:bg-slate-100 text-[#0f172a]"
              onClick={saveChanges}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!isEditing ? (
            // View mode
            <div className="space-y-4">
              <InfoItem label="Full Name" value={profile?.name || ""} />
              <InfoItem label="Email Address" value={profile?.email || ""} />
              <InfoItem
                label="Member Since"
                value={profile?.joinedDate || ""}
              />
            </div>
          ) : (
            // Edit mode
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editForm.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="bg-[#0f172a]/50 border-[#334155] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email || ""}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="bg-[#0f172a]/50 border-[#334155] text-white"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
