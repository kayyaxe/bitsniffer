import React from "react";
import "./App.css";
import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/joy";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <CssVarsProvider defaultMode="system" disableTransitionOnChange>
      <CssBaseline />
      <NavBar />
      <Home />
    </CssVarsProvider>
  );
}

export default App;
