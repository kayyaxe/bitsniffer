import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Card,
  Grid,
  Box,
  Button,
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
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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
                borderColor: "#FF69B4",
                backgroundColor: "rgba(255, 105, 180, 0.2)",
                fill: true,
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
    <Box sx={{ padding: 3, maxWidth: 1200, margin: "auto" }}>
      {loading && <CircularProgress />}
      {error && (
        <Typography color="error" variant="h6" textAlign="center">
          {error}
        </Typography>
      )}

      {coinData && (
        <>
          {/* Header Section */}
          <Box textAlign="center" mb={3}>
            <Typography variant="h3" fontWeight="bold">
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Coin Details */}
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <img
                  src={coinData.image.large}
                  alt={coinData.name}
                  width="80"
                  style={{ marginBottom: "10px" }}
                />
                <Typography variant="h5">
                  Rank: #{coinData.market_cap_rank}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                  ${coinData.market_data.current_price.usd.toLocaleString()}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color:
                      coinData.market_data.price_change_percentage_24h >= 0
                        ? "green"
                        : "red",
                    mt: 1,
                  }}
                >
                  24h Change:{" "}
                  {coinData.market_data.price_change_percentage_24h?.toFixed(2)}
                  %
                </Typography>
                <Typography variant="h6" mt={1}>
                  Market Cap: $
                  {coinData.market_data.market_cap.usd.toLocaleString()}
                </Typography>
              </Card>
            </Grid>

            {/* Chart Section */}
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight="bold" textAlign="center">
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
                        backgroundColor: timeframe === time ? "#FF69B4" : "",
                        color: timeframe === time ? "white" : "#FF69B4",
                        "&:hover": {
                          backgroundColor: timeframe === time ? "#d64c91" : "",
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
                      height: 350,
                      "@media (max-width: 600px)": { height: 250 },
                    }}
                  >
                    <Line data={chartData} />
                  </Box>
                ) : (
                  <Typography textAlign="center">Loading chart...</Typography>
                )}
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default CoinDetail;
