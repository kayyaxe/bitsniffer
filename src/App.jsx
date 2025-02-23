import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Home from "./pages/Home";
import AllCoins from "./pages/AllCoins";
import AllNews from "./pages/AllNews";
import NavBar from "./components/NavBar";
import CoinDetail from "./pages/CoinDetail";
import Footer from "./components/Footer";

function App() {
  const [news, setNews] = useState([]); // Store news data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Store error message

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      const primaryApiKey = import.meta.env.VITE_NEWS_API_KEY;
      const backupApiKey = import.meta.env.VITE_BACKUP_NEWS_API_KEY;

      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=cryptocurrency&apikey=${primaryApiKey}&lang=en&max=10`
        );

        // Check if the response is successful (status code 200)
        if (response.status === 200) {
          setNews(response.data.articles || []);
        } else {
          // If not successful, try the spare API key
          throw new Error("Primary API call failed");
        }
      } catch (error) {
        console.error("Primary API call failed, trying spare API key...");
        try {
          const response = await axios.get(
            `https://gnews.io/api/v4/search?q=cryptocurrency&apikey=${backupApiKey}&lang=en&max=10`
          );

          // Check if the response is successful (status code 200)
          if (response.status === 200) {
            setNews(response.data.articles || []);
          } else {
            throw new Error("Spare API call failed");
          }
        } catch (spareError) {
          setError(
            "Failed to fetch news from both APIs. Please try again later."
          );
          console.error(spareError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white min-h-screen flex flex-col">
      <Router>
        <NavBar />
        <div className="mt-16 ">
          <Routes>
            <Route
              path="/"
              element={<Home news={news} loading={loading} error={error} />}
            />
            <Route path="/coins" element={<AllCoins />} />
            <Route
              path="/news"
              element={<AllNews news={news} loading={loading} error={error} />}
            />
            <Route path="/coin/:coinId" element={<CoinDetail />} />
          </Routes>
        </div>
        <Footer /> {/* Footer should still be placed here */}
      </Router>
    </div>
  );
}

export default App;
