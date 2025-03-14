// @/components/lineup/builder/header/nav-link.tsx
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function NavLink({ href, icon: Icon, label, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-[#0f172a] transition-colors"
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </a>
  );
}
