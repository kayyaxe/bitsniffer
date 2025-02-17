import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard"; // Import NewsCard

function NewsSection({ count = 3 }) {  // Default to 3 news articles
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://gnews.io/api/v4/search?q=crypto&apikey=${
          import.meta.env.VITE_NEWS_API_KEY
        }&lang=en&max=${count}`
      )
      .then((response) => {
        setTopNews(response.data.articles || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]); // Refetch when count changes


  return (
    <>
      <h1 className="mb-10">Top 3 Cryptocurrency News! 🗞️</h1>

      <div
        className="news-container"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {topNews.map((article) => (
           <NewsCard key={article.url} news={article} />
           )) }
          
      </div>
    </>
  );
}

export default NewsSection;
