import { useState, useEffect } from "react";
import { toast } from "sonner";
import { userService } from "@/services/api/userService";
import type { ProfileData } from "@/services/api/userService";

export function useProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ProfileData>>({});

  const fetchProfile = async () => {
    try {
      const data = await userService.getProfile();
      setProfileData({
        ...data,
        avatarUrl: "https://ui.shadcn.com/avatars/01.png",
        joinedDate: new Date(data.createdAt).toLocaleDateString(),
      });
    } catch (error) {
      toast.error("Failed to load profile");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const startEditing = () => {
    if (profileData) {
      setEditForm({
        name: profileData.name,
        email: profileData.email,
      });
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setEditForm({});
    setIsEditing(false);
  };

  const updateField = (field: keyof ProfileData, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    if (!editForm) return false;

    try {
      await userService.updateProfile(editForm);
      await fetchProfile();
      setIsEditing(false);
      setEditForm({});
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
      return false;
    }
  };

  return {
    profile: profileData,
    isLoading,
    isEditing,
    editForm,
    fetchProfile,
    startEditing,
    cancelEditing,
    updateField,
    saveChanges,
  };
}
