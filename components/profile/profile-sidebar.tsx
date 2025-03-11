// components/profile/profile-sidebar.tsx
import {
  User,
  Settings,
  Shield,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavItem from "@/components/profile/nav-item";

interface ProfileSidebarProps {
  user: {
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export default function ProfileSidebar({ user }: ProfileSidebarProps) {
  const router = useRouter();

  return (
    <Card className="bg-[#1e293b]/80 border-[#334155] text-white md:col-span-1">
      <CardHeader>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-[#334155] mb-4 overflow-hidden">
            <img
              src={user.avatarUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-center">{user.name}</CardTitle>
          <p className="text-sm text-slate-400 mt-1">{user.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          <NavItem icon={<User size={18} />} label="Account" active />
          <NavItem icon={<Settings size={18} />} label="Preferences" />
          <NavItem icon={<Shield size={18} />} label="Security" />
          <NavItem icon={<Bell size={18} />} label="Notifications" />
          <NavItem icon={<CreditCard size={18} />} label="Billing" />
          <NavItem icon={<HelpCircle size={18} />} label="Help" />

          <Separator className="my-4 bg-[#334155]" />

          <NavItem
            icon={<LogOut size={18} />}
            label="Sign Out"
            onClick={() => {
              toast.success("You have been signed out successfully");
              router.push("/");
            }}
          />
        </nav>
      </CardContent>
    </Card>
  );
}
