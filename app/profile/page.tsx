"use client";

import { useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import ProfileSidebar from "@/components/profile/profile-sidebar";
import AccountInformation from "@/components/profile/account-information";
import { Header } from "@/components/layout";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { profile, isLoading, fetchProfile, updateProfile } = useProfile();

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">My Profile</h2>
          <p className="text-slate-300">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ProfileSidebar user={profile} />

          <div className="md:col-span-3 space-y-6">
            <AccountInformation user={profile} onSave={updateProfile} />
          </div>
        </div>
      </main>
    </div>
  );
}
