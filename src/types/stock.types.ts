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

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  link: string;
  published: string;
}

export interface NewsResponse {
  items: NewsItem[];
  page: number;
  limit: number;
}
