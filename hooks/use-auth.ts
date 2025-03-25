"use client";

import { useSession, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const logout = () => {
    const currentTeamId = localStorage.getItem("selectedTeamId");
    if (currentTeamId) {
      const lineupKey = `hockey-lineup-${currentTeamId}`;
      const lineupData = localStorage.getItem(lineupKey);
      if (lineupData) {
        localStorage.setItem(`saved_${lineupKey}`, lineupData);
      }

      localStorage.removeItem(lineupKey);
      localStorage.removeItem("selectedTeamId");
    }

    signOut();
  };

  const handleLoginSuccess = () => {
    const savedKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("saved_hockey-lineup-")
    );

    savedKeys.forEach((savedKey) => {
      const originalKey = savedKey.replace("saved_", "");
      const savedData = localStorage.getItem(savedKey);
      if (savedData) {
        localStorage.setItem(originalKey, savedData);
        localStorage.removeItem(savedKey);
      }
    });
  };

  return {
    user: session?.user,
    isAuthenticated,
    isLoading,
    logout,
    handleLoginSuccess,
  };
}
