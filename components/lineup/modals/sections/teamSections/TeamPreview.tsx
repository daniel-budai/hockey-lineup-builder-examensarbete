import { TeamFormField } from "../../form-fields/TeamFormField";

interface TeamPreviewProps {
  formData: {
    name: string;
    abbreviation: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

export function TeamPreview({ formData }: TeamPreviewProps) {
  return (
    <TeamFormField label="Team Preview">
      <div className="flex items-center space-x-4 p-4 bg-[#0f172a]/50 rounded-lg">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
          style={{
            backgroundColor: formData.primaryColor,
            color: formData.secondaryColor,
          }}
        >
          {formData.abbreviation || "HC"}
        </div>
        <div className="text-xl font-bold">
          {formData.name || "Hockey Club"}
        </div>
      </div>
    </TeamFormField>
  );
}
