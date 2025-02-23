import React from "react";
import NewsCard from "./NewsCard"; // Import NewsCard
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function NewsSection({ news, loading, error }) {
  if (loading) {
    return <p>Loading news...</p>; // Display loading message
  }

  if (error) {
    return <p>{error}</p>; // Display error message
  }

  // Get the top 3 news articles
  const topNews = news.slice(0, 3);

  return (
    <>
      <h2 className="mb-15 text-3xl">Top 3 Cryptocurrency News 🗞️</h2>
      <div
        className="news-container"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "100px",
          flexWrap: "wrap",
        }}
      >
        {topNews.map((article) => (
          <NewsCard key={article.url} news={article} />
        ))}
      </div>

      {/* See All Coins Button */}
      <div className="text-center mt-10">
        <Link to="/news">
          <button className="!bg-amber-700 !text-white !px-6 !py-3 !text-xl !font-semibold !rounded-lg hover:!bg-amber-800 !">
            SEE ALL NEWS
          </button>
        </Link>
      </div>
    </>
  );
}

export default NewsSection;
