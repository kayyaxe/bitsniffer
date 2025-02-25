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
  Switch,
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
  const [showRelevantLinks, setShowRelevantLinks] = useState(false);

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
                borderColor: "#007BFF",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                pointRadius: 0.5,
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
      fetchChartData(backupApiKey).catch(() => {
        setError("Failed to fetch chart data with both API keys.");
      });
    });
  }, [coinId, timeframe, primaryApiKey, backupApiKey]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleSwitchChange = (event) => {
    setShowRelevantLinks(event.target.checked);
  };

  const chipStyle = {
    fontSize: "15px",
    height: "35px", // Uniform
    width: "90px",
    padding: "0 10", // Consistent internal spacing
    borderRadius: "16px", // Keeps rounded edges
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
                    backgroundColor: "#007BFF",
                    color: "#fff",
                  }}
                />
              </Typography>
            </Box>
          </Box>

          {/* Coin Details Card */}
          <Card
            sx={{
              p: 3,
              textAlign: "center",
              backgroundColor: "#2a2a3d",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              width: "80%",
              margin: "auto",
            }}
          >
            {/* Switch for toggling links visibility */}
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Switch
                checked={showRelevantLinks}
                onChange={handleSwitchChange}
                color="primary"
              />
              <Typography variant="body1" color="#fff">
                Relevant Links
              </Typography>
            </Box>

            <Box
              sx={{
                transformStyle: "preserve-3d",
                transition: "transform 0.6s",
                transform: showRelevantLinks
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
                position: "relative",
                height: "200px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  backfaceVisibility: "hidden",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* Current Price */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#007BFF",
                  }}
                >
                  ${coinData.market_data.current_price.usd.toFixed(2)}
                </Typography>

                {/* Stats Container */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    width: "100%",
                  }}
                >
                  {/* Market Cap */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" color="#aaa">
                      Market Cap
                    </Typography>
                    <Typography variant="h6" color="#fff">
                      ${coinData.market_data.market_cap.usd.toLocaleString()}
                    </Typography>
                  </Box>

                  {/* 24h Volume */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" color="#aaa">
                      24h Volume
                    </Typography>
                    <Typography variant="h6" color="#fff">
                      ${coinData.market_data.total_volume.usd.toLocaleString()}
                    </Typography>
                  </Box>

                  {/* Circulating Supply */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" color="#aaa">
                      Circulating Supply
                    </Typography>
                    <Typography variant="h6" color="#fff">
                      {coinData.market_data.circulating_supply.toLocaleString()}{" "}
                      {coinData.symbol.toUpperCase()}
                    </Typography>
                  </Box>

                  {/* Total Supply */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" color="#aaa">
                      Total Supply
                    </Typography>
                    <Typography variant="h6" color="#fff">
                      {coinData.market_data.total_supply
                        ? coinData.market_data.total_supply.toLocaleString()
                        : "N/A"}{" "}
                      {coinData.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Back Side with Relevant Links */}

              <Box
                sx={{
                  position: "absolute",
                  backfaceVisibility: "hidden",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#2a2a3d",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: "rotateY(180deg)",
                  padding: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  {coinData.links.homepage[0] && (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography variant="body1" color="#fff">
                        Website:
                      </Typography>
                      <Chip
                        label="Visit"
                        component="a"
                        href={coinData.links.homepage[0]}
                        target="_blank"
                        clickable
                        sx={{
                          ...chipStyle,
                          backgroundColor: "#007BFF",
                          color: "#fff",
                        }}
                      />
                    </Box>
                  )}

                  {coinData.name && (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography variant="body1" color="#fff">
                        Reddit :{" "}
                      </Typography>
                      <Chip
                        label="Join"
                        component="a"
                        href={`https://www.reddit.com/r/${coinData.name
                          .replace(/\s+/g, "")
                          .toLowerCase()}`}
                        target="_blank"
                        clickable
                        sx={{
                          ...chipStyle,
                          backgroundColor: "#FF4500",
                          color: "#fff",
                        }}
                      />
                    </Box>
                  )}

                  {coinData.links.twitter_screen_name && (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography variant="body1" color="#fff">
                        Twitter :{" "}
                      </Typography>
                      <Chip
                        label="Follow"
                        component="a"
                        href={`https://twitter.com/${coinData.links.twitter_screen_name}`}
                        target="_blank"
                        clickable
                        sx={{
                          ...chipStyle,
                          backgroundColor: "#1DA1F2",
                          color: "#fff",
                        }}
                      />
                    </Box>
                  )}

                  {coinData.links.subreddit && (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography variant="body1" color="#fff">
                        Reddit :{" "}
                      </Typography>
                      <Chip
                        label="Join"
                        component="a"
                        href={coinData.links.subreddit}
                        target="_blank"
                        clickable
                        sx={{
                          ...chipStyle,
                          backgroundColor: "#FF4500",
                          color: "#fff",
                        }}
                      />
                    </Box>
                  )}

                  {coinData.links.blockchain_site && (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography variant="body1" color="#fff">
                        Explorer :{" "}
                      </Typography>
                      <Chip
                        label="View"
                        component="a"
                        href={coinData.links.blockchain_site}
                        target="_blank"
                        clickable
                        sx={{
                          ...chipStyle,
                          backgroundColor: "#FFD700",
                          color: "#000",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Cards for Price Change % */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
              margin: "auto",
              marginTop: "20px",
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
                24H Change
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color:
                    coinData.market_data.price_change_percentage_24h >= 0
                      ? "#00FF00"
                      : "#FF4500",
                  fontWeight: "bold",
                }}
              >
                {coinData.market_data.price_change_percentage_24h?.toFixed(2)}%
              </Typography>
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
                7D Change
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color:
                    coinData.market_data.price_change_percentage_7d >= 0
                      ? "#00FF00"
                      : "#FF4500",
                  fontWeight: "bold",
                }}
              >
                {coinData.market_data.price_change_percentage_7d?.toFixed(2)}%
              </Typography>
            </Card>
          </Box>

          {/* Chart Section */}
          <Card
            sx={{
              p: 3,
              backgroundColor: "#2a2a3d",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              width: "80%",
              margin: "auto",
              mt: 3,
            }}
          >
            <Typography variant="h5" color="#fff" textAlign="center">
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
                    backgroundColor: timeframe === time ? "#007BFF" : "",
                    color: timeframe === time ? "white" : "#007BFF",
                    "&:hover": {
                      backgroundColor: timeframe === time ? "#0056b3" : "",
                    },
                  }}
                >
                  {time}
                </Button>
              ))}
            </Box>
            {chartData ? (
              <Line data={chartData} options={{ responsive: true }} />
            ) : (
              <Typography color="#fff">Loading chart...</Typography>
            )}
          </Card>
        </>
      )}
    </Box>
  );
}

export default CoinDetail;
