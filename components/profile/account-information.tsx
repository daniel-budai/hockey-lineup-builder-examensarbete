// components/profile/account-information.tsx
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Save, X } from "lucide-react";
import InfoItem from "@/components/profile/info-item";

interface AccountInformationProps {
  user: {
    name: string;
    email: string;
    joinedDate: string;
  };
}

export default function AccountInformation({ user }: AccountInformationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save profile
  const handleSaveProfile = () => {
    // Here you would save the data to your backend
    toast.success("Your profile information has been saved successfully");
    setIsEditing(false);
  };

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
            onClick={() => setIsEditing(true)}
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
              onClick={() => {
                setIsEditing(false);
                setUserData({
                  name: user.name,
                  email: user.email,
                });
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-white hover:bg-slate-100 text-[#0f172a]"
              onClick={handleSaveProfile}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="bg-[#0f172a]/50 border-[#334155] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="bg-[#0f172a]/50 border-[#334155] text-white"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <InfoItem label="Full Name" value={userData.name} />
              <InfoItem label="Email Address" value={userData.email} />
              <InfoItem label="Member Since" value={user.joinedDate} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
