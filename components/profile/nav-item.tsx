import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: NavItemProps) {
  return (
    <button
      className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md transition-colors ${
        active
          ? "bg-[#0f172a] text-white"
          : "text-slate-300 hover:bg-[#0f172a]/70 hover:text-white"
      }`}
      onClick={onClick}
    >
      <span className="text-slate-400">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
