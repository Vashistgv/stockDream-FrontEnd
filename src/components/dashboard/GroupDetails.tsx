"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Group {
  id: string;
  name: string;
  price: number;
  members: number;
  winningPrize: number;
  stocks: string[];
}

interface GroupDetailsProps {
  group: Group;
}

const GroupDetails: React.FC<GroupDetailsProps> = ({ group }) => {
  const router = useRouter();

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-4">
        {group.name} Details
      </h2>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="text-white/80 text-sm mb-1">Entry Fee</p>
          <p className="text-2xl font-bold">₹{group.price}</p>
        </div>

        <div className="stat-card">
          <p className="text-white/80 text-sm mb-1">Prize Pool</p>
          <p className="text-2xl font-bold">₹{group.winningPrize}</p>
        </div>

        <div className="stat-card">
          <p className="text-white/80 text-sm mb-1">Members</p>
          <p className="text-2xl font-bold">{group.members}</p>
        </div>

        <div className="stat-card">
          <p className="text-white/80 text-sm mb-1">Spots Left</p>
          <p className="text-2xl font-bold">{50 - group.members}</p>
        </div>
      </div>

      <button
        className="w-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
        onClick={() => router.push("/join-group")}
      >
        Join {group.name} - ₹{group.price}
      </button>
    </div>
  );
};

export default GroupDetails;
