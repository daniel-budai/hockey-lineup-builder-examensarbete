"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { Player } from "@/types/player";
import { PlayerHeader } from "./sections/playerSection/PlayerHeader";
import { PlayerDetails } from "./sections/playerSection/PlayerDetails";
import { PlayerStats } from "./sections/playerSection/PlayerStats";
import { DeleteConfirmation } from "./sections/playerSection/DeleteConfirmation";

interface PlayerDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  player: Player;
  onRemovePlayer: (playerId: string) => void;
}

export function PlayerDetailModal({
  open,
  onOpenChange,
  player,
  onRemovePlayer,
}: PlayerDetailModalProps) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDelete = () => {
    onRemovePlayer(player.id);
    setConfirmDeleteOpen(false);
    onOpenChange(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAge = () => {
    if (player.age) return player.age;
    if (!player.birthdate) return "N/A";

    const birthDate = new Date(player.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-[#1e293b] border-[#334155] text-white max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center justify-between">
              <span>Player Details</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setConfirmDeleteOpen(true)}
                className="h-8 px-2"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6 py-4">
              <PlayerHeader
                number={player.number}
                name={player.name}
                positions={player.positions}
              />
              <PlayerDetails
                nationality={player.nationality}
                age={getAge()}
                birthdate={player.birthdate}
                birthplace={player.birthplace}
                height={player.height}
                weight={player.weight}
                formatDate={formatDate}
              />
              <PlayerStats stats={player.stats} positions={player.positions} />
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-white hover:bg-slate-100 text-[#0f172a]"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmation
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        playerName={player.name}
        onConfirm={handleDelete}
      />
    </>
  );
}
