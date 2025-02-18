import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Paper, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CoinDetail() {
  const { coinId } = useParams(); // Get coin ID from the URL params
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('24h');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((response) => {
        setCoinData(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch coin details.");
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [coinId]);

  // Fetch the chart data when timeframe or coinId changes
  useEffect(() => {
    if (coinId) {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${timeframe === '24h' ? 1 : timeframe === '30d' ? 30 : 90}`)
        .then((response) => {
          const prices = response.data.prices;
          const chartLabels = prices.map((price) => new Date(price[0]).toLocaleTimeString());
          const chartValues = prices.map((price) => price[1]);

          setChartData({
            labels: chartLabels,
            datasets: [
              {
                label: "Price (USD)",
                data: chartValues,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
              },
            ],
          });
        })
        .catch((error) => {
          setError("Failed to fetch chart data.");
          console.error(error);
        });
    }
  }, [coinId, timeframe]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Coin Info */}
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {coinData && (
        <div>
          <Typography variant="h4" gutterBottom>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </Typography>
          <Paper style={{ padding: "20px", marginBottom: "20px" }}>
            <img
              src={coinData.image.large}
              alt={coinData.name}
              width="50"
              style={{ marginRight: "10px" }}
            />
            <Typography variant="h6">
              Rank: {coinData.market_cap_rank}
            </Typography>
            <Typography variant="h5">
              Price: ${coinData.market_data.current_price.usd.toLocaleString()}
            </Typography>
            <Typography variant="h6" style={{ color: coinData.market_data.price_change_percentage_24h >= 0 ? "green" : "red" }}>
              24h Change: {coinData.market_data.price_change_percentage_24h?.toFixed(2)}%
            </Typography>
            <Typography variant="h6">
              Market Cap: ${coinData.market_data.market_cap.usd.toLocaleString()}
            </Typography>
          </Paper>

          {/* Chart */}
          <div style={{ marginBottom: "20px" }}>
            <Button variant={timeframe === "24h" ? "contained" : "outlined"} onClick={() => handleTimeframeChange("24h")}>
              24h
            </Button>
            <Button variant={timeframe === "30d" ? "contained" : "outlined"} onClick={() => handleTimeframeChange("30d")}>
              30d
            </Button>
            <Button variant={timeframe === "90d" ? "contained" : "outlined"} onClick={() => handleTimeframeChange("90d")}>
              3 months
            </Button>
          </div>
          {chartData && <Line data={chartData} />}
        </div>
      )}
    </div>
  );
}

export default CoinDetail;
