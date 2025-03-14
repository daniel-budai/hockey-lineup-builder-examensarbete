// @/components/lineup/builder/header/index.tsx
import { HopIcon } from "lucide-react"; // Menu, User, Users
import { MobileNav } from "./mobile-nav";
import { MainNav } from "@/components/layout/main-nav";

export function Header() {
  return (
    <header className="bg-[#0f172a]/80 border-b border-[#334155]/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <HopIcon className="h-6 w-6 text-white mr-2" />
            <h1 className="text-xl font-bold">Hockey Lineup Builder</h1>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileNav />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <MainNav />
          </div>
        </div>
      </div>
    </header>
  );
}
