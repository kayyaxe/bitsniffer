import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { Input, Button, CircularProgress } from "@mui/joy";
import { debounce } from "lodash"; // Using lodash for debouncing


function AllNews() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("crypto"); // Default search term
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Declare error state here

  useEffect(() => {
    const fetchNews = async () => {
        if (!query) return; // Avoid API call if query is empty
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://gnews.io/api/v4/search?q=${query}&apikey=${
              import.meta.env.VITE_NEWS_API_KEY
            }&lang=en&max=10`
          );
          setNews(response.data.articles || []);
        } catch (error) {
          setError("Failed to fetch news. Please try again later.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchNews();
    }, [query]); // Fetch news when query changes

     // Debounced search function
  const debouncedSearch = debounce((value) => {
    setQuery(value); // Trigger the search once the user stops typing
  }, 500); // 500ms debounce


  // Handle search when clicking the button
  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
    debouncedSearch(value); // Call debounced function
    
  };

  return (
    <div>
      <h1 className="mb-5">Top Cryptocurrency News 📰</h1>

      {/* Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: "100px", marginBottom: "20px" }}>
        <Input
          placeholder="Search news..."
          value={searchTerm}
          onChange={handleInputChange} // Update search term and trigger query change immediately
          sx={{ width: "700px" }}
        />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <CircularProgress />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", color: "red" }}>
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
        {news.length > 0 ? (
          news.map((article) => <NewsCard key={article.url} news={article} />)
        ) : (
          <p>No news found. Try a different keyword.</p>
        )}
      </div>
    </div>
  );
}

export default AllNews;
