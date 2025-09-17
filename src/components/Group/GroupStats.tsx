interface GroupStatsProps {
  entryFee: number;
  prizePool: number;
  totalMembers: number;
  activeMembers: number;
}

export default function GroupStats({
  entryFee,
  prizePool,
  totalMembers,
  activeMembers,
}: GroupStatsProps) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p className="text-white/80 text-sm mb-1">Entry Fee</p>
        <p className="text-2xl font-bold">₹{entryFee}</p>
      </div>
      <div className="stat-card">
        <p className="text-white/80 text-sm mb-1">Prize Pool</p>
        <p className="text-2xl font-bold">₹{prizePool}</p>
      </div>
      <div className="stat-card">
        <p className="text-white/80 text-sm mb-1">Total Members</p>
        <p className="text-2xl font-bold">{totalMembers}</p>
      </div>
      <div className="stat-card hidden sm:block">
        <p className="text-white/80 text-sm mb-1">Active</p>
        <p className="text-2xl font-bold">{activeMembers}</p>
      </div>
    </div>
  );
}
