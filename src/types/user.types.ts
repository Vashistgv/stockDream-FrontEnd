export interface User {
  id: string;
  name: string;
  avatar: string;
  totalReturn: number;
  group: string;
  performance: number[];
}

export interface UserPerformanceModalProps {
  user: User | null;
  onClose: () => void;
}
