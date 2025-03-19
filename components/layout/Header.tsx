import { HopIcon as Hockey } from "lucide-react";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
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
  );
}
