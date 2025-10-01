import { Member } from "@/types";

interface LeaderboardProps {
  members: Member[];
}

export default function Leaderboard({ members }: LeaderboardProps) {
  return (
    <div className="card">
      <h2 className="section-title">Leaderboard</h2>
      <div>
        {members.map((member, index) => (
          <div key={member.id} className="leaderboard-item">
            <div className="rank-badge">{index + 1}</div>

            <div className="w-12 h-12 hidden md:flex bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] rounded-full items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">
                {member.name.charAt(0)}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[rgb(var(--color-text))] text-sm truncate">
                {member.name}
              </h3>
              <p className="text-[rgb(var(--color-text-secondary))] text-xs">
                Joined {member.joinedAt}
              </p>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="font-bold text-[rgb(var(--color-success))] text-sm">
                {member.totalReturn}%
              </p>
              <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                Return
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
