interface PlayerDetailsProps {
  nationality: string;
  age: number | string;
  birthdate?: string;
  birthplace?: string;
  height?: { cm?: number; imperial?: string };
  weight?: { kg?: number; lbs?: number };
  formatDate: (date?: string) => string;
}

export function PlayerDetails({
  nationality,
  age,
  birthdate,
  birthplace,
  height,
  weight,
  formatDate,
}: PlayerDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      <DetailField label="Nationality" value={nationality} />
      <DetailField label="Age" value={age} />
      <DetailField label="Date of Birth" value={formatDate(birthdate)} />
      <DetailField label="Place of Birth" value={birthplace || "N/A"} />
      <DetailField
        label="Height"
        value={`${height?.cm ? `${height.cm} cm` : ""}${
          height?.cm && height?.imperial ? " / " : ""
        }${height?.imperial || "N/A"}`}
      />
      <DetailField
        label="Weight"
        value={`${weight?.kg ? `${weight.kg} kg` : ""}${
          weight?.kg && weight?.lbs ? " / " : ""
        }${weight?.lbs ? `${weight.lbs} lbs` : "N/A"}`}
      />
    </div>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-400">{label}</h4>
      <p className="text-white">{value}</p>
    </div>
  );
}
