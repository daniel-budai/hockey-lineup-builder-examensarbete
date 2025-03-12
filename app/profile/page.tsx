"use client";

import { useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import ProfileSidebar from "@/components/profile/profile-sidebar";
import AccountInformation from "@/components/profile/account-information";
import { MainNav } from "@/components/main-nav";
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
      {/* Header */}
      <header className="bg-[#0f172a]/80 border-b border-[#334155]/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Hockey Lineup Builder</h1>
            </div>

            {/* Main Navigation */}
            <div className="flex items-center overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <MainNav />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">My Profile</h2>
          <p className="text-slate-300">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <ProfileSidebar user={profile} />

          {/* Main Content Area */}
          <div className="md:col-span-3 space-y-6">
            <AccountInformation user={profile} onSave={updateProfile} />
          </div>
        </div>
      </main>
    </div>
  );
}
