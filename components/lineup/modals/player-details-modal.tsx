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
import type { Player } from "@/types/lineup";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Trash2 } from "lucide-react";

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
  console.log("PlayerDetailModal render:", { open, player: player.name });
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDelete = () => {
    onRemovePlayer(player.id);
    setConfirmDeleteOpen(false);
    onOpenChange(false);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate age if not provided
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
      <Dialog
        open={open}
        onOpenChange={(value) => {
          console.log("Dialog onOpenChange:", value);
          onOpenChange(value);
        }}
      >
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
              {/* Player header */}
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-white text-[#0f172a] flex items-center justify-center text-2xl font-bold">
                  {player.number}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{player.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {player.positions?.map((position) => (
                      <span
                        key={position}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#334155] text-white"
                      >
                        {position}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Player details */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-400">
                    Nationality
                  </h4>
                  <p className="text-white">{player.nationality}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400">Age</h4>
                  <p className="text-white">{getAge()}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400">
                    Date of Birth
                  </h4>
                  <p className="text-white">{formatDate(player.birthdate)}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400">
                    Place of Birth
                  </h4>
                  <p className="text-white">{player.birthplace || "N/A"}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400">Height</h4>
                  <p className="text-white">
                    {player.height?.cm ? `${player.height.cm} cm` : ""}
                    {player.height?.cm && player.height?.imperial ? " / " : ""}
                    {player.height?.imperial || "N/A"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400">Weight</h4>
                  <p className="text-white">
                    {player.weight?.kg ? `${player.weight.kg} kg` : ""}
                    {player.weight?.kg && player.weight?.lbs ? " / " : ""}
                    {player.weight?.lbs ? `${player.weight.lbs} lbs` : "N/A"}
                  </p>
                </div>
              </div>

              {/* Player stats */}
              {player.stats && Object.keys(player.stats).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold border-b border-[#334155] pb-2 mb-3">
                    Statistics
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {player.positions?.includes("G") ? (
                      <>
                        {player.stats.savePercentage !== undefined && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">
                              Save Percentage
                            </h4>
                            <p className="text-white text-lg font-semibold">
                              {player.stats.savePercentage.toFixed(3)}
                            </p>
                          </div>
                        )}
                        {player.stats.goalsAgainstAverage !== undefined && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">
                              GAA
                            </h4>
                            <p className="text-white text-lg font-semibold">
                              {player.stats.goalsAgainstAverage.toFixed(2)}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {player.stats.goals !== undefined && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">
                              Goals
                            </h4>
                            <p className="text-white text-lg font-semibold">
                              {player.stats.goals}
                            </p>
                          </div>
                        )}
                        {player.stats.assists !== undefined && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">
                              Assists
                            </h4>
                            <p className="text-white text-lg font-semibold">
                              {player.stats.assists}
                            </p>
                          </div>
                        )}
                        {player.stats.points !== undefined && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">
                              Points
                            </h4>
                            <p className="text-white text-lg font-semibold">
                              {player.stats.points}
                            </p>
                          </div>
                        )}
                        {player.stats.plusMinus !== undefined && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-400">
                              +/-
                            </h4>
                            <p className="text-white text-lg font-semibold">
                              {player.stats.plusMinus}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                    {player.stats.gamesPlayed !== undefined && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-400">
                          Games Played
                        </h4>
                        <p className="text-white text-lg font-semibold">
                          {player.stats.gamesPlayed}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
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

      <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <AlertDialogContent className="bg-[#1e293b] border-[#334155] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Player</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Are you sure you want to remove {player.name} from the roster?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#334155] text-white hover:bg-[#0f172a]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
