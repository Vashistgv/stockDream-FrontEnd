"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Group } from "@/types";

interface GroupCardProps {
  group: Group;
  isActive: boolean;
  onClick: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, isActive, onClick }) => {
  const router = useRouter();

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/join-group/${group._id}`);
  };

  const handleMembersClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/group-members/${group._id}`);
  };

  return (
    <div
      className={`group-card ${
        isActive ? "active" : ""
      } px-6 py-6 rounded-xl shadow-lg mb-6 transition-colors
  ${
    isActive
      ? "bg-[rgb(var(--color-primary))] text-white"
      : "bg-white text-gray-800 dark:bg-[#181E2A] dark:text-white"
  }
`}
      onClick={onClick}
      style={{ minWidth: 260, maxWidth: 320 }}
    >
      <h3 className="font-bold text-xl mb-5">{group.name}</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span
            className={`text-sm ${
              isActive
                ? "text-white/80"
                : "text-[rgb(var(--color-text-secondary))]"
            }`}
          >
            Entry Fee:
          </span>
          <span className="font-semibold">₹{group.entryFee}</span>
        </div>

        <div className="flex justify-between items-center">
          <span
            className={`text-sm ${
              isActive
                ? "text-white/80"
                : "text-[rgb(var(--color-text-secondary))]"
            }`}
          >
            Prize Pool:
          </span>
          <span className="font-semibold">₹{group.prizePool}</span>
        </div>

        <div className="flex justify-between items-center">
          <span
            className={`text-sm ${
              isActive
                ? "text-white/80"
                : "text-[rgb(var(--color-text-secondary))]"
            }`}
          >
            Members:
          </span>
          <span className="font-semibold">
            {group.currentMembers}/{group.maxMembers}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        {/* <button
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            isActive
              ? "bg-white text-[rgb(var(--color-primary))] hover:bg-gray-100"
              : "bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary))]/90"
          }`}
          onClick={handleJoinClick}
        >
          Join
        </button> */}
        <button
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
            isActive
              ? "border-white text-white hover:bg-white/10"
              : "border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary))]/10"
          }`}
          onClick={handleMembersClick}
        >
          Members
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
