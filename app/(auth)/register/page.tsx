"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HopIcon as Hockey } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Your account has been created.");
      router.push("/dashboard");
    }, 1000);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
          <Button
            variant="ghost"
            className="text-white hover:text-slate-300 hover:bg-[#1e293b]/50 transition-colors"
          >
            <Hockey className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] bg-[#1e293b]/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-white/5">
          <div className="flex flex-col space-y-2 text-center">
            <Hockey className="mx-auto h-6 w-6 text-white" />
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Create an account
            </h1>
            <p className="text-sm text-slate-300">
              Enter your details to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-slate-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                    className="rounded-lg bg-[#0f172a]/80 border-[#334155] focus-visible:ring-[#64748b] text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                    className="rounded-lg bg-[#0f172a]/80 border-[#334155] focus-visible:ring-[#64748b] text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-slate-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isLoading}
                    required
                    className="rounded-lg bg-[#0f172a]/80 border-[#334155] focus-visible:ring-[#64748b] text-white placeholder:text-slate-500"
                  />
                </div>
                <Button
                  disabled={isLoading}
                  className="bg-white hover:bg-slate-100 text-[#0f172a] shadow-md hover:shadow-lg transition-all rounded-lg"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#334155]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1e293b]/80 px-2 text-slate-400">Or</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Button
                variant="outline"
                disabled={isLoading}
                className="border-[#334155] text-white hover:bg-[#0f172a]/50 shadow-sm rounded-lg"
              >
                Continue with Google
              </Button>
            </div>
          </div>
          <p className="px-8 text-center text-sm text-slate-300">
            <Link
              href="/login"
              className="text-white hover:text-slate-200 hover:underline transition-colors"
            >
              Already have an account? Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
