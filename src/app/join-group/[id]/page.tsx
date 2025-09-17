"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/utils/API";
import { toast } from "sonner";

type Quote = {
  current: number | null;
  prevClose: number | null;
  changePct: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
  lastUpdated: Date | null;
};

interface Stock {
  symbol: string;
  name: string;
  quote: Quote;
}

interface PageProps {
  params: {
    id: string;
  };
}

// Mock fallback with new structure

export default function JoinGroup({ params }: PageProps) {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const router = useRouter();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    if (params.id) {
      API.get(`/api/groups/${params.id}`)
        .then((res) => {
          const { group, quotes } = res.data.data;

          // Convert into Stock[]
          const formattedStocks = group.availableStocks.map(
            (symbol: string) => ({
              symbol,
              name: symbol, // 🔹 you can replace with a mapping if you want company names
              quote: quotes[symbol] || {
                current: null,
                prevClose: null,
                changePct: null,
                high: null,
                low: null,
                volume: null,
                lastUpdated: null,
              },
            })
          );

          setStocks(formattedStocks);
        })
        .catch((err) => console.log(err));
    }
  }, [params.id]);

  const toggleStock = (symbol: string) => {
    if (selectedStocks.includes(symbol)) {
      setSelectedStocks((prev) => prev.filter((s) => s !== symbol));
    } else if (selectedStocks.length < 5) {
      setSelectedStocks((prev) => [...prev, symbol]);
    }
  };

  const handleJoinGroup = () => {
    if (selectedStocks.length === 5) {
      API.post(`/api/groups/${params.id}/join`, {
        userId: currentUser._id || currentUser.id,
        selectedStocks: selectedStocks,
      })
        .then((res) => {
          console.log(res);
          router.push(`/group-members/${params.id}`);
        })
        .catch((err) => console.log(err));
    } else {
      toast("Please select exactly 5 stocks", {
        description: `Selected: ${selectedStocks.length}/5`,
        duration: 5000,
      });
      setSelectedStocks((prev) => {
        return prev.filter((s) => !selectedStocks.includes(s));
      });
    }
  };

  return (
    <div className="content">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="mb-4 text-[rgb(var(--color-primary))] hover:opacity-80 font-medium"
          >
            ← Back to Dashboard
          </button>
          <h1 className="page-title">Join Group</h1>
          <p className="text-[rgb(var(--color-text-secondary))]">
            Select exactly 5 stocks from {stocks.length} available options
          </p>
        </div>

        {/* Progress Section */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">
              Selected: {selectedStocks.length}/5
            </span>
            <span className="text-[rgb(var(--color-text-secondary))] text-sm">
              {selectedStocks.length === 5
                ? "Ready to join!"
                : `${5 - selectedStocks.length} more needed`}
            </span>
          </div>
          <div className="w-full bg-[rgb(var(--color-border))] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] h-3 rounded-full transition-all duration-300"
              style={{ width: `${(selectedStocks.length / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Selected Stocks Summary */}
        {selectedStocks.length > 0 && (
          <div className="card">
            <div className="flex flex-wrap gap-2">
              {selectedStocks.length > 0 && (
                <div className="selection-summary">
                  <h3>Your Selection</h3>
                  <div className="selection-badges">
                    {selectedStocks.map((symbol, index) => (
                      <div key={symbol} className="selection-badge">
                        <div className="order-number">{index + 1}</div>
                        <span>{symbol}</span>
                        <button
                          className="remove-btn"
                          onClick={() => toggleStock(symbol)}
                          aria-label={`Remove ${symbol}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stocks Grid */}
        <div className="stocks-grid">
          {stocks.map((stock) => {
            const isSelected = selectedStocks.includes(stock.symbol);
            const canSelect = selectedStocks.length < 5 || isSelected;

            return (
              <div
                key={stock.symbol}
                className={`card card-hover relative ${
                  isSelected
                    ? "ring-2 ring-[rgb(var(--color-primary))] bg-gradient-to-br from-[rgb(var(--color-primary))]/10 to-[rgb(var(--color-accent))]/10"
                    : canSelect
                    ? "hover:ring-1 hover:ring-[rgb(var(--color-primary))]/50"
                    : "opacity-50 cursor-not-allowed"
                } ${!canSelect && "pointer-events-none"}`}
                onClick={() => canSelect && toggleStock(stock.symbol)}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[rgb(var(--color-primary))] rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{stock.symbol}</h3>
                  <span className="font-bold text-lg">
                    ${stock.quote.current ?? "--"}
                  </span>
                </div>

                <p className="text-sm text-[rgb(var(--color-text-secondary))] mb-3 text-truncate">
                  {stock.name}
                </p>

                <div
                  className={`text-sm font-medium ${
                    (stock.quote.changePct ?? 0) >= 0
                      ? "text-[rgb(var(--color-success))]"
                      : "text-[rgb(var(--color-danger))]"
                  }`}
                >
                  {(stock.quote.changePct ?? 0) >= 0 ? "+" : ""}
                  {stock.quote.changePct ?? "--"}%
                </div>
              </div>
            );
          })}
        </div>

        {/* Join Button */}
        <div className="sticky bottom-4 pt-6">
          <button
            onClick={handleJoinGroup}
            disabled={selectedStocks.length !== 5}
            className={`w-full h-14 text-lg font-semibold rounded-lg transition-all duration-300 ${
              selectedStocks.length === 5
                ? "bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-white hover:opacity-90 cursor-pointer"
                : "bg-[rgb(var(--color-border))] text-[rgb(var(--color-text-secondary))] cursor-not-allowed"
            }`}
          >
            {selectedStocks.length === 5
              ? "Join Group with 5 Stocks"
              : `Select ${5 - selectedStocks.length} more stocks`}
          </button>
        </div>
      </div>
    </div>
  );
}
