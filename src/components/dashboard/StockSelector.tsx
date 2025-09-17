"use client";

import { useEffect, useState } from "react";
import StockSelector from "@/components/StockSelector";
import { fetchStockData } from "@/lib/yahooFinance";

const availableStocks = ["AAPL", "MSFT", "AMZN", "GOOGL", "TSLA"];

export default function JoinGroup() {
  const [stocks, setStocks] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        setLoading(true);
        const stockData = await fetchStockData(availableStocks);
        setStocks(stockData);
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStocks();
  }, []);

  const handleJoinGroup = (selectedSymbols: string[]) => {
    setSelected(selectedSymbols);
    setJoined(true);
    console.log("Joined group with stocks:", selectedSymbols);
  };

  if (joined) {
    return (
      <div className="dashboard-container">
        <main className="main-content">
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="w-20 h-20 rounded-full bg-[rgb(var(--color-primary))] mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h1 className="page-title">Successfully Joined!</h1>
              <p className="section-subtitle">
                You've joined the group with {selected.length} stocks. Good luck
                with your trading!
              </p>
            </div>

            <div className="stats-grid max-w-2xl mx-auto">
              <div className="stat-card">
                <div className="stat-label">Your Stocks</div>
                <div className="stat-value primary">{selected.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Status</div>
                <div className="stat-value">Active</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Group</div>
                <div className="stat-value primary">Joined</div>
              </div>
            </div>

            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="join-group-btn mt-8"
            >
              Go to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar-section">
        <h1 className="page-title mobile-only mb-6">Join Stock Group</h1>

        <div className="section-spacing">
          <h2 className="section-title">Instructions</h2>
          <p className="section-subtitle mb-4">
            1. Select 3-5 stocks for your portfolio
          </p>
          <p className="section-subtitle mb-4">2. Confirm your selection</p>
          <p className="section-subtitle">3. Start trading and compete!</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="page-title mobile-hide">Join Stock Group</h1>

        <div className="fade-in">
          <div className="section-spacing">
            <h2 className="section-title">Select Your Stocks</h2>
            <p className="section-subtitle">
              Choose 3-5 stocks for your trading portfolio. Your performance
              will be tracked against other group members.
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">Loading available stocks...</div>
            </div>
          ) : (
            <StockSelector
              stocks={stocks}
              onSelect={handleJoinGroup}
              selectedStocks={selected}
            />
          )}
        </div>
      </main>
    </div>
  );
}
