// components/profile/info-item.tsx
interface InfoItemProps {
  label: string;
  value: string;
}

export default function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center py-2 border-b border-[#334155] last:border-0">
      <span className="text-slate-400 md:w-1/3">{label}</span>
      <span className="font-medium md:w-2/3">{value}</span>
    </div>
  );
}
