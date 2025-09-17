import React from "react";
import { PopularStock } from "@/types";

export interface PopularStocksProps {
  stocks: PopularStock[];
}

const PopularStocks: React.FC<PopularStocksProps> = ({ stocks }) => {
  return (
    <section className="bg-[rgb(var(--color-card))] rounded-2xl p-6 border border-[rgb(var(--color-border))] shadow-sm">
      <h3 className="text-xl font-semibold text-[rgb(var(--color-text))] mb-4">
        Popular Stocks
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex justify-between items-center p-3 rounded-lg hover:bg-[rgb(var(--color-primary))]/5 transition-colors"
          >
            <div>
              <p className="font-bold text-[rgb(var(--color-text))] text-sm">
                {stock.symbol}
              </p>
              <p className="text-xs text-[rgb(var(--color-text-secondary))] truncate max-w-[120px]">
                {stock.name}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[rgb(var(--color-text))]">
                ${stock.price}
              </p>
              <p
                className={`text-xs font-medium ${
                  stock.change >= 0
                    ? "text-[rgb(var(--color-success))]"
                    : "text-[rgb(var(--color-danger))]"
                }`}
              >
                {stock.change >= 0 ? "+" : ""}
                {stock.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularStocks;
