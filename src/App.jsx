import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router
import "./App.css";

import Home from "./pages/Home";
import AllCoins from "./pages/AllCoins";
import AllNews from "./pages/AllNews";
import NavBar from "./components/NavBar";
import CoinDetail from "./pages/CoinDetail";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<AllCoins />} />
        <Route path="/news" element={<AllNews />} />
        <Route path="/coin/:coinId" element={<CoinDetail />} /> {/* Dynamic route */}

      </Routes>
    </Router>
  );
}

export default App;
