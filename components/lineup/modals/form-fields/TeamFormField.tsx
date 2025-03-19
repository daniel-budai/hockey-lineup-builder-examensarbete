import { Label } from "@/components/ui/label";

interface TeamFormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
}

export function TeamFormField({
  label,
  error,
  required,
  children,
  htmlFor,
}: TeamFormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className={error ? "text-red-400" : ""}>
        {label}
        {required && "*"}
      </Label>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
