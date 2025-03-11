import type { LineupData } from "@/types/lineup";

interface TabHandlingProps {
  setCurrentHoveredTab: (tab: string | null) => void;
  setActiveTab: (tab: string) => void;
  setPreviewLineup: (lineup: LineupData | null) => void;
}

export function useTabHandling({
  setCurrentHoveredTab,
  setActiveTab,
  setPreviewLineup,
}: TabHandlingProps) {
  const handleTabHover = (tabLine: string | null, sourceLine?: string) => {
    if (!tabLine) {
      setCurrentHoveredTab(null);
      setPreviewLineup(null);
      return;
    }

    setCurrentHoveredTab(tabLine);
    setActiveTab(tabLine);

    if (sourceLine && sourceLine !== tabLine) {
      return true;
    }

    setPreviewLineup(null);
    return false;
  };

  return { handleTabHover };
}
