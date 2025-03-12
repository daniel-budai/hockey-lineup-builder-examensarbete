"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { HopIcon as Hockey, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#0f172a] text-white border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Hockey className="h-6 w-6" />
            <span className="text-lg font-bold">Hockey Lineup Builder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/lineups"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Lineups
                </Link>
                <Link
                  href="/teams"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Teams
                </Link>
                <Link
                  href="/profile"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Profile
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-[#0f172a] hover:bg-slate-100">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-slate-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/lineups"
                  className="text-slate-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Lineups
                </Link>
                <Link
                  href="/teams"
                  className="text-slate-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Teams
                </Link>
                <Link
                  href="/profile"
                  className="text-slate-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white mt-2"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white hover:bg-slate-800 w-full justify-start"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-white text-[#0f172a] hover:bg-slate-100 w-full">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
