"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Group } from "@/types";

export interface LeftSideBarProps {
  groups: Group[];
  activeGroup: Group | null;
  setActiveGroup: (group: Group) => void;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({
  groups,
  activeGroup,
  setActiveGroup,
}) => {
  const router = useRouter();

  return (
    <aside className="sidebar-section">
      {/* Mobile title - hidden on desktop */}
      <h1 className="page-title block lg:hidden">Stock Dream Dashboard</h1>

      <h2 className="section-title">Available Groups</h2>

      {/* Groups List - Mobile responsive */}
      <div className="space-y-3 sm:space-y-4 mb-6">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => setActiveGroup(group)}
            className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 ${
              activeGroup?.id === group.id
                ? "bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-white scale-105 shadow-lg"
                : "bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))]/50 hover:scale-105"
            }`}
          >
            <div className="font-semibold text-sm sm:text-base mb-2">
              {group.name}
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span
                className={
                  activeGroup?.id === group.id
                    ? "text-white/80"
                    : "text-[rgb(var(--color-text-secondary))]"
                }
              >
                Entry: ₹{group.price}
              </span>
              <span
                className={`font-bold ${
                  activeGroup?.id === group.id
                    ? "text-white"
                    : "text-[rgb(var(--color-primary))]"
                }`}
              >
                Win: ₹{group.winningPrize}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Join Group Button - Mobile responsive */}
      <Button
        onClick={() => router.push("/join-group")}
        className="w-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-white hover:opacity-90 transition-opacity text-sm sm:text-base"
        size="default"
      >
        Join New Group
      </Button>
    </aside>
  );
};

export default LeftSideBar;
