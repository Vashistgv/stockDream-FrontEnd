export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  createdAt?: string;
  loading?: boolean;
  quotes?: Record<
    string,
    {
      current: number;
      prevClose: number;
      changePct: number;
      high: number;
      low: number;
      volume: number;
    }
  >;
};
