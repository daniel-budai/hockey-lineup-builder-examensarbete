// components/profile/account-information.tsx
"use client";

import { useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Save, X } from "lucide-react";
import InfoItem from "@/components/profile/info-item";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, UpdateProfileInput } from "@/schemas/auth.schema";

export default function AccountInformation() {
  const {
    profile,
    isLoading,
    isEditing,
    startEditing,
    cancelEditing,
    saveChanges,
  } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Update form when profile changes or edit mode starts
  useEffect(() => {
    if (profile) {
      setValue("name", profile.name || "");
      setValue("email", profile.email || "");
    }
  }, [profile, isEditing, setValue]);

  const onSubmit = async (data: UpdateProfileInput) => {
    await saveChanges({
      name: data.name,
      email: data.email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    // Reset password fields
    setValue("currentPassword", "");
    setValue("newPassword", "");
    setValue("confirmNewPassword", "");
  };

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
              onClick={() => {
                cancelEditing();
                reset();
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-white hover:bg-slate-100 text-[#0f172a]"
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty}
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
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    className={`bg-[#0f172a]/50 border-[#334155] text-white ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    className={`bg-[#0f172a]/50 border-[#334155] text-white ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-[#334155] pt-6">
                <h3 className="text-lg font-medium mb-4">Change Password</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className={`bg-[#0f172a]/50 border-[#334155] text-white ${
                        errors.currentPassword ? "border-red-500" : ""
                      }`}
                      {...register("currentPassword")}
                    />
                    {errors.currentPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.currentPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className={`bg-[#0f172a]/50 border-[#334155] text-white ${
                          errors.newPassword ? "border-red-500" : ""
                        }`}
                        {...register("newPassword")}
                      />
                      {errors.newPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmNewPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmNewPassword"
                        type="password"
                        className={`bg-[#0f172a]/50 border-[#334155] text-white ${
                          errors.confirmNewPassword ? "border-red-500" : ""
                        }`}
                        {...register("confirmNewPassword")}
                      />
                      {errors.confirmNewPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.confirmNewPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
