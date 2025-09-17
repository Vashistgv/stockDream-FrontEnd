"use client";

import React from "react";

interface LeaderboardUser {
  id: string;
  name: string;
  totalReturn: number;
  group: string;
}

const mockLeaderboard: LeaderboardUser[] = [
  { id: "u1", name: "Alice", totalReturn: 17.5, group: "Tech Giants" },
  { id: "u2", name: "Bob", totalReturn: 15.3, group: "Blue Chips" },
  { id: "u3", name: "Carol", totalReturn: 14.1, group: "Growth Stocks" },
  { id: "u4", name: "Dave", totalReturn: 12.9, group: "Tech Giants" },
  { id: "u5", name: "Emma", totalReturn: 11.6, group: "Blue Chips" },
];

const LeaderboardSidebar: React.FC = () => {
  return (
    <div className="sidebar right">
      <h2 className="section-title">Leaderboard</h2>
      <div>
        {mockLeaderboard.map((user, index) => (
          <div key={user.id} className="leaderboard-item">
            <div className="rank-badge">{index + 1}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[rgb(var(--color-text))] text-sm truncate">
                {user.name}
              </h3>
              <p className="text-[rgb(var(--color-text-secondary))] text-xs truncate">
                {user.group}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[rgb(var(--color-success))] text-sm">
                {user.totalReturn}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardSidebar;
