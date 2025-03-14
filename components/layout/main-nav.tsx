// @/components/main-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HopIcon as Hockey, User, Users, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth(); //user om jag vill ha username nå

  const navItems = isAuthenticated
    ? [
        {
          name: "Lineup Builder",
          href: "/dashboard",
          icon: Hockey,
        },
        {
          name: "My Profile",
          href: "/profile",
          icon: User,
        },
        {
          name: "Team Management",
          href: "/management",
          icon: Users,
        },
        {
          name: "Sign Out",
          href: "#",
          icon: LogOut,
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            logout();
          },
        },
      ]
    : [
        {
          name: "Sign In",
          href: "/login",
          icon: User,
        },
        {
          name: "Sign Up",
          href: "/register",
          icon: Users,
        },
      ];

  return (
    <nav className={cn("flex items-center space-x-4", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href || item.name}
            href={item.href}
            onClick={item.onClick}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-white text-[#0f172a]"
                : "text-white hover:bg-[#1e293b] hover:text-white"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
