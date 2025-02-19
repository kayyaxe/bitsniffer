import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { Input, CircularProgress } from "@mui/joy";
import { debounce } from "lodash"; // Using lodash for debouncing

function AllNews() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // User's search term
  const [filteredNews, setFilteredNews] = useState([]); // Filtered news based on search term
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Constant query for "crypto"
  const query = "crypto";

  // Fetch news when the component mounts
  useEffect(() => {
    const fetchNews = async (apiKey) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=${query}&apikey=${apiKey}&lang=en&max=10`
        );
        setNews(response.data.articles || []);
        setFilteredNews(response.data.articles || []); // Set initial filtered news to fetched news
      } catch (error) {
        setError("Failed to fetch news. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const primaryApiKey = import.meta.env.VITE_NEWS_API_KEY;
    const backupApiKey = import.meta.env.VITE_BACKUP_NEWS_API_KEY;

    // First attempt with the primary API key
    fetchNews(primaryApiKey).catch(() => {
      // If it fails, attempt with the backup API key
      fetchNews(backupApiKey);
    });
  }, []);

  // Debounced search function to update the search term
  const debouncedSearch = debounce((value) => {
    setSearchTerm(value); // Set search term when user stops typing
  }, 1);

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
