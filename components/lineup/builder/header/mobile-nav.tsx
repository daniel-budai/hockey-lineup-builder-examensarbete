// @/components/lineup/builder/header/mobile-nav.tsx
import { HopIcon, Menu, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "./nav-link";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-[#1e293b] border-[#334155] text-white p-0"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[#334155]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <HopIcon className="h-6 w-6 text-white mr-2" />
                <span className="font-bold">Menu</span>
              </div>
            </div>
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            <NavLink href="/dashboard" icon={HopIcon} label="Lineup Builder" />
            <NavLink href="/profile" icon={User} label="My Profile" />
            <NavLink href="/teams" icon={Users} label="Team Management" />
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
