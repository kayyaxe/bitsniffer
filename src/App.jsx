import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { CssBaseline, Select, Option } from "@mui/joy";

function App() {
  function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    // necessary for server-side rendering
    // because mode is undefined on the server
    React.useEffect(() => {
      setMounted(true);
    }, []);
    if (!mounted) {
      return null;
    }

    return (
      <Select
        value={mode}
        onChange={(event, newMode) => {
          setMode(newMode);
        }}
        sx={{ width: "max-content" }}
      >
        <Option value="light">Light</Option>
        <Option value="dark">Dark</Option>
      </Select>
    );
  }

  return (
    <>
      <CssVarsProvider defaultMode="system" disableTransitionOnChange>
        <CssBaseline />
        <ModeToggle />
        <Home></Home>
      </CssVarsProvider>
    </>
  );
}

export default App;
