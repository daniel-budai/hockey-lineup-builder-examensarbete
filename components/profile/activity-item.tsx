// components/profile/activity-item.tsx
import { User } from "lucide-react";

interface ActivityItemProps {
  action: string;
  target: string;
  time: string;
}

export default function ActivityItem({
  action,
  target,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-3 py-2 border-b border-[#334155] last:border-0">
      <div className="w-8 h-8 rounded-full bg-[#334155]/50 flex items-center justify-center">
        <User size={16} className="text-slate-300" />
      </div>
      <div className="flex-1">
        <p>
          <span className="font-medium">{action}</span>{" "}
          <span className="text-slate-300">{target}</span>
        </p>
        <p className="text-sm text-slate-400">{time}</p>
      </div>
    </div>
  );
}
