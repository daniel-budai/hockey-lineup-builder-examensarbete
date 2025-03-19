import { HopIcon as Hockey } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const DragDropIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M14 14c0-1.1.9-2 2-2" />
    <path d="M14 18c0-1.1.9-2 2-2" />
    <path d="M14 22c0-1.1.9-2 2-2" />
    <path d="M6 18c0-1.1.9-2 2-2" />
    <path d="M6 22c0-1.1.9-2 2-2" />
    <rect width="16" height="6" x="4" y="4" rx="2" />
  </svg>
);

const TeamManagementIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export function FeaturesSection() {
  const features = [
    {
      icon: Hockey,
      title: "Hockey Rink Visualization",
      description:
        "Visual representation of a hockey rink with player positions.",
    },
    {
      icon: DragDropIcon,
      title: "Drag & Drop Interface",
      description:
        "Easily move players between positions with intuitive drag and drop.",
    },
    {
      icon: TeamManagementIcon,
      title: "Team Management",
      description:
        "Save and load different team lineups for various strategies.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Key Features
            </h2>
            <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to manage your hockey team lineups
              effectively.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
