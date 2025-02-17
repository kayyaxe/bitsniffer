import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router
import "./App.css";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import Home from "./pages/Home";
import AllCoins from "./pages/AllCoins";
import AllNews from "./pages/AllNews";
import NavBar from "./components/NavBar";

function App() {
  return (
    <CssVarsProvider defaultMode="system" disableTransitionOnChange>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<AllCoins />} />
          <Route path="/news" element={<AllNews />} />
        </Routes>
      </Router>
    </CssVarsProvider>
  );
}

export default App;
