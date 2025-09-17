import { useState, useEffect } from "react";
import { Group, Stock } from "@/types";
import { fetchStockData } from "@/lib/yahooFinance";

export const useDashboard = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await fetch("/group-data.json");
        if (!response.ok) throw new Error("Failed to fetch groups");
        const groupData = await response.json();
        setGroups(groupData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    loadGroups();
  }, []);

  useEffect(() => {
    const loadStocks = async () => {
      if (!activeGroup?.stocks?.length) {
        setStocks([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const stockData = await fetchStockData(activeGroup.stocks);
        setStocks(stockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stocks");
        setStocks([]);
      } finally {
        setLoading(false);
      }
    };

    loadStocks();
  }, [activeGroup]);

  return {
    groups,
    activeGroup,
    setActiveGroup,
    stocks,
    loading,
    error,
  };
};
