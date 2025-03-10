"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast.success("You have been logged in successfully.");
      router.push("/dashboard");
    }, 1500);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-300">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          required
          className="rounded-lg bg-[#0f172a]/80 border-[#334155] focus-visible:ring-[#64748b] text-white placeholder:text-slate-500"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-slate-300">
            Password
          </Label>
          <Button
            variant="link"
            className="h-auto p-0 text-sm text-slate-400 hover:text-white"
            type="button"
          >
            Forgot password?
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          required
          className="rounded-lg bg-[#0f172a]/80 border-[#334155] focus-visible:ring-[#64748b] text-white placeholder:text-slate-500"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-white hover:bg-slate-100 text-[#0f172a] shadow-md hover:shadow-lg transition-all rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
