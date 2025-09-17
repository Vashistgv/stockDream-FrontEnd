"use client";

import React from "react";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  time: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Market hits new highs",
    summary:
      "The stock market reached new heights today with significant gains across tech sector.",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Dividend Kings announce dividend",
    summary:
      "Dividend Kings group declared dividends increasing member returns this quarter.",
    time: "4 hours ago",
  },
  {
    id: 3,
    title: "Tech Stocks rally continues",
    summary:
      "Tech stocks saw a strong rally amid positive earnings reports from major companies.",
    time: "6 hours ago",
  },
];

const NewsSidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2 className="section-title">Market News</h2>
      <div>
        {mockNews.map((news) => (
          <div key={news.id} className="news-item">
            <h3 className="font-semibold text-[rgb(var(--color-primary))] text-sm mb-2 leading-tight">
              {news.title}
            </h3>
            <p className="text-[rgb(var(--color-text-secondary))] text-xs mb-3 leading-relaxed">
              {news.summary}
            </p>
            <p className="text-[rgb(var(--color-text-secondary))] text-xs opacity-75">
              {news.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSidebar;
