export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  volume?: string;
  marketCap?: string;
}

export interface PopularStock extends Stock {
  volume: string;
  marketCap: string;
}

export interface StockCardProps {
  stock: Stock;
  onSelect?: (stock: Stock) => void;
}
