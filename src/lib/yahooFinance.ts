import axios from "axios";

// This uses a third-party API proxy or serverless function for Yahoo Finance
// Replace `YOUR_YAHOO_FINANCE_ENDPOINT`
export const fetchStockData = async (symbols: string[]) => {
  const res = await axios.get(`YOUR_YAHOO_FINANCE_ENDPOINT`, {
    params: { symbols: symbols.join(",") },
  });
  return res.data;
};
