// components/profile/stat-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

export default function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card className="bg-[#1e293b]/80 border-[#334155] text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
