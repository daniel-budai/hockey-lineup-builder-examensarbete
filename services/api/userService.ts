export interface ProfileData {
  name: string;
  email: string;
  createdAt: string;
  avatarUrl?: string;
  joinedDate?: string;
}

export const userService = {
  async getProfile(): Promise<ProfileData> {
    const response = await fetch("/api/auth/user/profile");

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return response.json();
  },

  async updateProfile(updates: Partial<ProfileData>): Promise<void> {
    const response = await fetch("/api/auth/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
  },
};
