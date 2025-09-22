import API from "@/utils/API";
import axios from "axios";
import { AxiosResponse } from "axios";
import { NewsItem, NewsResponse } from "@/types/stock.types";
// This uses a third-party API proxy or serverless function for Yahoo Finance
// Replace `YOUR_YAHOO_FINANCE_ENDPOINT`
export const fetchStockData = async (symbols: string[]) => {
  const res = await axios.get(`YOUR_YAHOO_FINANCE_ENDPOINT`, {
    params: { symbols: symbols.join(",") },
  });
  return res.data;
};

export async function fetchYahooNews(
  page: number = 1,
  limit: number = 10
): Promise<NewsResponse> {
  const res: AxiosResponse<NewsResponse> = await API.get(
    `/news/yahoo?page=${page}&limit=${limit}`
  );
  return res.data;
}
