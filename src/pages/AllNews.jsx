import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import { Input, CircularProgress } from "@mui/joy";
import { debounce } from "lodash"; // Using lodash for debouncing

function AllNews({ news, loading, error }) {
  const [searchTerm, setSearchTerm] = useState(""); // User's search term
  const [filteredNews, setFilteredNews] = useState([]); // Filtered news based on search term

  // Set initial filtered news to fetched news
  useEffect(() => {
    setFilteredNews(news);
  }, [news]); // Update filtered news whenever the news changes

  // Debounced search function to update the search term
  const debouncedSearch = debounce((value) => {
    setSearchTerm(value); // Set search term when user stops typing
  }, 300); // Set a reasonable debounce time

  // Handle input change and update search term
  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    debouncedSearch(value); // Trigger the debounced search
  };

  // Filter news based on the search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredNews(news); // If search term is empty, show all news
    } else {
      const filtered = news.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(filtered); // Update filtered news based on search term
    }
  }, [searchTerm, news]); // Re-run filtering whenever search term or news changes

  return (
    <div>
      <h1 className="mb-5">Top Cryptocurrency News 📰</h1>

      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "100px",
          marginBottom: "20px",
        }}
      >
        <Input
          placeholder="Search news..."
          value={searchTerm}
          onChange={handleInputChange} // Update search term
          sx={{ width: "700px" }}
        />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            color: "red",
          }}
        >
          <p>{error}</p>
        </div>
      )}

      {/* News Display */}
      <div
        className="news-container"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {filteredNews.length > 0 ? (
          filteredNews.map((article) => (
            <NewsCard key={article.url} news={article} />
          ))
        ) : (
          <p>No news found. Try a different keyword.</p>
        )}
      </div>
    </div>
  );
}

export default AllNews;
