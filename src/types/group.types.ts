export interface Member {
  id: string;
  name: string;
  totalReturn: number;
  joinedAt: string;
}

export interface Group {
  _id: string;
  name: string;
  entryFee: number;
  prizePool: number;
  currentMembers: number;
  maxMembers: number;
  members: {
    userId: { _id: string; username: string };
    joinedAt: string;
    currentReturn: number;
  }[];
}
