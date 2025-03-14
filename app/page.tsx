"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, HopIcon as Hockey, Shield } from "lucide-react";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#1e293b] text-white">
      <header className="bg-[#0f172a]/80 border-b border-[#334155]/30 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Hockey className="h-6 w-6 text-white" />
            <span className="text-lg font-bold text-white">
              Hockey Lineup Builder
            </span>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                    Digital Hockey Lineup Management
                  </h1>
                  <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Create, manage, and optimize your hockey team lineups with
                    our intuitive drag-and-drop interface.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0f172a] shadow-md hover:shadow-lg transition-all">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                  <div className="hockey-rink h-full w-full shadow-lg bg-[#e2e8f0] border-2 border-white/50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="h-24 w-24 text-white opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your hockey team lineups
                  effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 bg-[#1e293b]/80 p-6 rounded-xl shadow-md hover:shadow-lg transition-all backdrop-blur-sm border border-white/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f172a]">
                  <Hockey className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    Hockey Rink Visualization
                  </h3>
                  <p className="text-slate-300">
                    Visual representation of a hockey rink with player
                    positions.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 bg-[#1e293b]/80 p-6 rounded-xl shadow-md hover:shadow-lg transition-all backdrop-blur-sm border border-white/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f172a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M14 14c0-1.1.9-2 2-2" />
                    <path d="M14 18c0-1.1.9-2 2-2" />
                    <path d="M14 22c0-1.1.9-2 2-2" />
                    <path d="M6 18c0-1.1.9-2 2-2" />
                    <path d="M6 22c0-1.1.9-2 2-2" />
                    <rect width="16" height="6" x="4" y="4" rx="2" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    Drag & Drop Interface
                  </h3>
                  <p className="text-slate-300">
                    Easily move players between positions with intuitive drag
                    and drop.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 bg-[#1e293b]/80 p-6 rounded-xl shadow-md hover:shadow-lg transition-all backdrop-blur-sm border border-white/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f172a]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    Team Management
                  </h3>
                  <p className="text-slate-300">
                    Save and load different team lineups for various strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#0f172a] border-t border-[#334155]/30">
        <div className="container flex flex-col gap-2 py-4 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
          <p className="text-center text-sm leading-loose text-slate-400 md:text-left">
            © {new Date().getFullYear()} Hockey Lineup Builder. All rights
            reserved.
          </p>
          <nav className="flex items-center justify-center gap-4 md:justify-end md:gap-6">
            <Link
              href="#"
              className="text-sm font-medium text-slate-400 hover:text-white hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-slate-400 hover:text-white hover:underline underline-offset-4"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-slate-400 hover:text-white hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
