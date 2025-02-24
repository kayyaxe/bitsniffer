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
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async (apiKey) => {
      console.log(`Using API Key: ${apiKey}`); // Log the API key being used

      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${
            page + 1
          }&price_change_percentage=7d&x-cg-demo-api-key=${apiKey}`
        );
        setCoins(response.data);
        setFilteredCoins(response.data);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch coins. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const primaryApiKey = import.meta.env.VITE_COINS_API_KEY;
    const backupApiKey = import.meta.env.VITE_BACKUP_COINS_API_KEY;

    // Attempt to fetch with the primary key, if it fails, try the backup key
    fetchCoins(primaryApiKey).catch(() => {
      fetchCoins(backupApiKey);
    });
  }, [page, rowsPerPage]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(value) ||
        coin.symbol.toLowerCase().includes(value)
    );
    setFilteredCoins(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Common styles for rows and cells
  const commonRowStyles = {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      cursor: "pointer",
    },
    transition: "background-color 0.3s",
  };

  const commonCellStyles = {
    color: "white",
    textAlign: "right",
    fontSize: "22px",
    padding: "20px", // Consistent padding
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap", // Prevents text
    height: "120px", // Set a fixed height for each cell
    verticalAlign: "middle", // Center content vertically
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <Typography variant="h3" gutterBottom>
        Cryptocurrency Prices
      </Typography>

      <div style={{ marginBottom: "15px", marginTop: "45px" }}>
        <Input
          placeholder="Search for a coin..."
          value={query}
          onChange={handleSearchChange}
          sx={{
            width: "82%",
            height: 70,
            padding: "10px",
            borderRadius: "2px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            fontSize: "22px",
            "&:hover": {
              outline: "2px solid #fff", // Outline effect on hover
            },
            "&:focus": {
              outline: "2px solid #fff", // Outline effect when focused
            },
          }}
        />
      </div>

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

      <TableContainer
        component={Paper}
        sx={{
          width: "85%",
          margin: "auto", // Center the table
          backgroundColor: "transparent",
          boxShadow: "none",
          padding: "30px",
        }}
      >
        <Table sx={{ borderRadius: "8px" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "25px",
                  textAlign: "left",
                }}
              >
                Rank
              </TableCell>
              <TableCell sx={{ color: "white", fontSize: "25px" }}>
                Coin
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "25px",
                  textAlign: "right",
                }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "25px",
                  textAlign: "right",
                }}
              >
                24h %
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "25px",
                  textAlign: "right",
                }}
              >
                7d %
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "25px",
                  textAlign: "right",
                }}
              >
                Market Cap
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "25px",
                  textAlign: "right",
                }}
              >
                Volume (24h)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoins.map((coin) => (
              <TableRow
                key={coin.id}
                sx={commonRowStyles}
                onClick={() => {
                  window.location.href = `/coin/${coin.id}`;
                }}
              >
                <TableCell sx={{ ...commonCellStyles, textAlign: "left" }}>
                  {coin.market_cap_rank}
                </TableCell>
                <TableCell sx={commonCellStyles}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      width="50"
                      style={{ marginRight: 8 }}
                    />
                    {coin.name}
                  </div>
                </TableCell>
                <TableCell sx={commonCellStyles}>
                  ${coin.current_price.toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    ...commonCellStyles,
                    color:
                      coin.price_change_percentage_24h >= 0
                        ? "#00FF00"
                        : "#FF4500",
                  }}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </TableCell>
                <TableCell
                  sx={{
                    ...commonCellStyles,
                    color:
                      coin.price_change_percentage_7d_in_currency >= 0
                        ? "#00FF00"
                        : "#FF4500",
                  }}
                >
                  {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </TableCell>
                <TableCell sx={commonCellStyles}>
                  ${coin.market_cap.toLocaleString()}
                </TableCell>
                <TableCell sx={commonCellStyles}>
                  ${coin.total_volume.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Centered Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0",
            fontsize: 15,
          }}
        >
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={coins.length} // Ensure this is the total number of coins
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ disabled: false }}
            backIconButtonProps={{ disabled: false }}
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
              color: "white",
              marginTop: "10px",
              "& .MuiTablePagination-selectLabel": {
                fontSize: "20px",
                color: "white",
              },
              "& .MuiInputBase-root": {
                color: "white",
              },
              "& .MuiSelect-icon": {
                color: "white", // Ensures dropdown arrow is white
              },
              "& .MuiInputBase-input": {
                fontSize: "20px",
                color: "white",
              },
              "& .MuiTablePagination-displayedRows": {
                fontSize: "20px",
                color: "white",
              },
              "& .MuiTablePagination-actions button": {
                fontSize: "24px",
                color: "white",
                pointerEvents: "auto", // Allow clicking
                cursor: "pointer", // Show pointer cursor
              },
            }}
          />
        </div>
      </TableContainer>
    </div>
  );
}

export default AllCoins;
