import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Card,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function CoinDetail() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("24h");

  // Define API keys
  const primaryApiKey = import.meta.env.VITE_COINS_API_KEY;
  const backupApiKey = import.meta.env.VITE_BACKUP_COINS_API_KEY;

  // Fetch coin details
  useEffect(() => {
    const fetchCoinDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        setCoinData(response.data);
      } catch (error) {
        setError("Failed to fetch coin details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [coinId]);

  // Fetch chart data based on timeframe
  useEffect(() => {
    const fetchChartData = async (apiKey) => {
      if (coinId) {
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${
              timeframe === "24h" ? 1 : timeframe === "30d" ? 30 : 90
            }&x-cg-demo-api-key=${apiKey}`
          );
          const prices = response.data.prices;
          const chartLabels = prices.map((price) =>
            new Date(price[0]).toLocaleDateString()
          );
          const chartValues = prices.map((price) => price[1]);

          setChartData({
            labels: chartLabels,
            datasets: [
              {
                label: "Price (USD)",
                data: chartValues,
                borderColor: "#007BFF", // Changed to a subdued blue
                backgroundColor: "rgba(0, 123, 255, 0.2)", // Changed to a subdued blue

                pointRadius: 0.5, // Adjust this value for smaller points
              },
            ],
          });
        } catch (error) {
          console.error("Failed to fetch chart data:", error);
          setError("Failed to fetch chart data.");
        }
      }
    };

    // Attempt to fetch chart data with primary API key first
    fetchChartData(primaryApiKey).catch(() => {
      // If the primary key fails, attempt to fetch with the backup API key
      fetchChartData(backupApiKey).catch(() => {
        setError("Failed to fetch chart data with both API keys.");
      });
    });
  }, [coinId, timeframe, primaryApiKey, backupApiKey]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // Set height to 100% of the viewport
        display: "flex",
        flexDirection: "column",
        padding: 3,
      }}
    >
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      )}
      {error && (
        <Typography
          color="error"
          variant="h6"
          textAlign="center"
          sx={{ marginTop: 2 }}
        >
          {error}
        </Typography>
      )}

      {coinData && (
        <>
          {/* Header Section */}
          <Box
            textAlign="center"
            mb={3}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Box display="flex" alignItems="center">
              <img
                src={coinData.image.large}
                alt={coinData.name}
                width="80"
                style={{ marginRight: "10px", borderRadius: "10px" }}
              />
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#fff"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {coinData.name} ({coinData.symbol.toUpperCase()})
                <Chip
                  label={`Rank: #${coinData.market_cap_rank}`}
                  sx={{
                    marginLeft: 2,
                    fontSize: 17,
                    alignContent: "center",
                    backgroundColor: "#007BFF", // Changed to a subdued blue
                    color: "#fff",
                  }}
                />
              </Typography>
            </Box>
          </Box>

          {/* Coin Details and Chart Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: 3,
              height: "100vh", // Ensure the parent container fills the viewport height
            }}
          >
            {/* Coin Details */}
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "#2a2a3d",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                width: "80%", // Set width to 80%
                margin: "auto", // Center the card
              }}
            >
              <Typography variant="h5" color="#fff">
                Rank: #{coinData.market_cap_rank}
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", mt: 2, color: "#007BFF" }} // Changed to a subdued blue
              >
                ${coinData.market_data.current_price.usd.toLocaleString()}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color:
                    coinData.market_data.price_change_percentage_24h >= 0
                      ? "#00FF00" // Use a contrasting color for positive changes
                      : "#FF4500", // Use a contrasting color for negative changes
                  mt: 1,
                  fontWeight: "bold",
                }}
              >
                24h Change:{" "}
                {coinData.market_data.price_change_percentage_24h?.toFixed(2)}%
              </Typography>
              <Typography variant="h6" mt={1} color="#fff">
                Market Cap: $
                {coinData.market_data.market_cap.usd.toLocaleString()}
              </Typography>
            </Card>

            {/* Card Section for Market Data */}
            {/* Card Section for Links */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
                margin: "auto",
              }}
            >
              <Card
                sx={{
                  p: 2,
                  backgroundColor: "#2a2a3d",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  flex: 1,
                  marginRight: 1,
                }}
              >
                <Typography variant="h6" color="#fff">
                  Official Website
                </Typography>
                <Button
                  href={coinData.links.homepage[0]} // Link to Bitcoin's official website
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#007BFF", // Changed to subdued blue
                    textDecoration: "underline",
                    "&:hover": {
                      color: "#0056b3", // Darker blue for hover
                    },
                  }}
                >
                  Visit Website
                </Button>
              </Card>
              <Card
                sx={{
                  p: 2,
                  backgroundColor: "#2a2a3d",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  flex: 1,
                  marginLeft: 1,
                }}
              >
                <Typography variant="h6" color="#fff">
                  Reddit Community
                </Typography>
                <Button
                  href={coinData.links.subreddit} // Link to Bitcoin's subreddit
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#FF4500", // Reddit color
                    textDecoration: "underline",
                    "&:hover": {
                      color: "#cc3700", // Darker reddit color for hover
                    },
                  }}
                >
                  Visit Reddit
                </Button>
              </Card>
            </Box>

            {/* Chart Section */}
            <Card
              sx={{
                p: 3,
                backgroundColor: "#2a2a3d",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                width: "80%", // Set width to 80%
                minHeight: "35%",

                margin: "auto", // Center the chart card
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                color="#fff"
              >
                Price Chart
              </Typography>

              <Box display="flex" justifyContent="center" gap={2} my={2}>
                {["24h", "30d", "90d"].map((time) => (
                  <Button
                    key={time}
                    variant={timeframe === time ? "contained" : "outlined"}
                    onClick={() => handleTimeframeChange(time)}
                    sx={{
                      fontWeight: "bold",
                      borderRadius: "20px",
                      px: 3,
                      backgroundColor: timeframe === time ? "#007BFF" : "", // Changed to subdued blue
                      color: timeframe === time ? "white" : "#007BFF", // Changed to subdued blue
                      "&:hover": {
                        backgroundColor: timeframe === time ? "#0056b3" : "", // Darker blue for hover
                      },
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </Box>

              {chartData ? (
                <Box
                  sx={{
                    flexGrow: 1,
                    width: "100%", // Fill 100% width
                    height: "100%", // Fill the full height of the card
                  }}
                >
                  <Line
                    data={chartData}
                    options={{ maintainAspectRatio: false }}
                  />
                </Box>
              ) : (
                <Typography textAlign="center" color="#fff">
                  Loading chart...
                </Typography>
              )}
            </Card>
          </Box>
        </>
      )}
    </Box>
  );
}

export default CoinDetail;
