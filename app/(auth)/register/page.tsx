import { RegisterForm } from "@/components/auth/register-form";
import { HopIcon as Hockey } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-white hover:text-slate-300 transition-colors"
        >
          <Hockey className="h-6 w-6" />
          <span className="text-lg font-bold">Hockey Lineup Builder</span>
        </Link>
        <div className="w-full max-w-md space-y-8 bg-[#1e293b]/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-white/5">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Sign up to start building your hockey lineups
            </p>
          </div>
          <RegisterForm />
          <div className="text-center text-sm">
            <p className="text-slate-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-white hover:text-slate-200 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
