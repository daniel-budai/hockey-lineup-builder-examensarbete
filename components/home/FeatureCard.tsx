import { LucideIcon } from "lucide-react";

type IconType = LucideIcon | React.FC;

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col justify-center space-y-4 bg-[#1e293b]/80 p-6 rounded-xl shadow-md hover:shadow-lg transition-all backdrop-blur-sm border border-white/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f172a]">
        <Icon />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  );
}
