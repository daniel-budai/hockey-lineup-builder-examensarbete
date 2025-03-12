import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  email: string;
  createdAt: string;
  avatarUrl?: string;
}

export function useProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ProfileData>>({});

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/auth/user/profile");
      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();

      setProfileData({
        ...data,
        avatarUrl: "https://ui.shadcn.com/avatars/01.png", // ha kvar denna tills vidare ska ändra implementera bilder någongång
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

  // Save changes
  const saveChanges = async () => {
    if (!editForm) return false;

    try {
      const success = await updateProfile(editForm);
      if (success) {
        setIsEditing(false);
        setEditForm({});
      }
      return success;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateProfile = async (updates: Partial<ProfileData>) => {
    try {
      const response = await fetch("/api/auth/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      await fetchProfile();
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
