"use client";

import { fetchYahooNews } from "@/lib/yahooFinance";
import React, { useEffect, useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  link: string;
  published: string;
}

const NewsSidebar: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (pageNumber: number) => {
    setLoading(true);
    try {
      let data = await fetchYahooNews(pageNumber, 5);
      // append new page data
      setNews((prev) => [...prev, ...data.items]);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  return (
    <div className="sidebar">
      <h2 className="section-title">Market News</h2>
      <div>
        {news.map((item) => (
          <div key={item.id} className="news-item">
            <h3 className="font-semibold text-[rgb(var(--color-primary))] text-sm mb-2 leading-tight">
              {item.title}
            </h3>
            <p className="text-[rgb(var(--color-text-secondary))] text-xs mb-3 leading-relaxed">
              {item.summary}
            </p>
            <p className="text-[rgb(var(--color-text-secondary))] text-xs opacity-75">
              {item.published}
            </p>
          </div>
        ))}

        {/* Load more button */}
        <div className="text-center mt-4">
          <button
            disabled={loading}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 text-sm rounded bg-[rgb(var(--color-primary))] text-white hover:opacity-90"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;
