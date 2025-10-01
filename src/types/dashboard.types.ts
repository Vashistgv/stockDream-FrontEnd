export interface Quote {
  current: number | null;
  prevClose: number | null;
  changePct: number | null;
  high?: number | null;
  low?: number | null;
  volume?: number | null;
  lastUpdated: string | null;
}

export interface GroupMember {
  userId: {
    _id: string;
    username: string;
  };
  currentReturn: number;
  joinedAt: string;
}

export interface Member {
  userId: string;
  joinedAt: string;
  selectedStocks: string[];
  currentReturn: number;
  _id: string;
}

export interface Owner {
  _id: string;
  username: string;
  role: string;
}

export interface Group {
  _id: string;
  owner: Owner;
  name: string;
  entryFee: number;
  prizePool: number;
  maxMembers: number;
  currentMembers: number;
  availableStocks: string[];
  status: "active" | "closed" | "pending";
  members: Member[];
  createdAt: string;
}

export interface GroupWithQuotes {
  group: Group;
  quotes: Record<string, Quote>;
}

export interface News {
  id: number;
  title: string;
  summary: string;
  time: string;
}

export interface DashboardProps {
  initialGroups?: Group[];
}
