import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const coinsData = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: 45000 },
  { id: 2, name: "Ethereum", symbol: "ETH", price: 3000 },
  { id: 3, name: "Binance Coin", symbol: "BNB", price: 400 },
];

function AllCoins() {
  return (
    <div>
      <h1>All Coins</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Symbol</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinsData.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell component="th" scope="row">
                  {coin.name}
                </TableCell>
                <TableCell align="right">{coin.symbol}</TableCell>
                <TableCell align="right">{coin.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AllCoins;
