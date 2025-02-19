import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Input,
} from "@mui/material";

function AllCoins() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]); // For the filtered coins
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState(""); // User's search query
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async (apiKey) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${
            page + 1
          }&price_change_percentage=7d&x-cg-demo-api-key=${apiKey}`
        );
        setCoins(response.data);
        setFilteredCoins(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch coins. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const primaryApiKey = import.meta.env.VITE_COINS_API_KEY;
    const backupApiKey = import.meta.env.VITE_BACKUP_COINS_API_KEY;

    // First attempt with the primary API key
    fetchCoins(primaryApiKey).catch(() => {
      // If it fails, attempt with the backup API key
      fetchCoins(backupApiKey);
    });
  }, [page, rowsPerPage]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    // Filter coins based on the search query
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(value) ||
        coin.symbol.toLowerCase().includes(value)
    );
    setFilteredCoins(filtered); // Update filtered coins
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Cryptocurrency Prices by Market Cap
      </Typography>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <Input
          placeholder="Search for a coin..."
          value={query}
          onChange={handleSearchChange} // Update search query
          sx={{ width: "100%", padding: "10px", color: "white" }}
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

      {/* Table */}
      <TableContainer component={Paper} sx={{ minWidth: "1000px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h %</TableCell>
              <TableCell align="right">7d %</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Volume (24h)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoins.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell>{coin.market_cap_rank}</TableCell>
                <TableCell>
                  <Link
                    to={`/coin/${coin.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      width="20"
                      style={{ marginRight: 8, verticalAlign: "middle" }}
                    />
                    {coin.name}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  ${coin.current_price.toLocaleString()}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    color:
                      coin.price_change_percentage_24h >= 0 ? "green" : "red",
                  }}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    color:
                      coin.price_change_percentage_7d_in_currency >= 0
                        ? "green"
                        : "red",
                  }}
                >
                  {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </TableCell>
                <TableCell align="right">
                  ${coin.market_cap.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  ${coin.total_volume.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={100} // Assuming API supports 100+ coins
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default AllCoins;
