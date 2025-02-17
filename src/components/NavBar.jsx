import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { CssBaseline, Select, Option } from "@mui/joy";
import React from "react";
import { Drawer, List, ListItem, Divider, Typography} from "@mui/joy";
import { ListItemText } from "@mui/material"; // Import from MUI material
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton"; // Import IconButton from MUI Joy
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import back arrow
import { Link } from "react-router-dom"; // Import Link for routing



function NavBar() {
  const [open, setOpen] = React.useState(false);
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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Mode Toggle */}
      <Select
        value={mode}
        onChange={(event, newMode) => setMode(newMode)}
        sx={{
          width: "max-content",
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <Option value="light">Light</Option>
        <Option value="dark">Dark</Option>
      </Select>

      {/* Drawer Toggle Button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{ position: "absolute", top: 20, left: 20 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: 200,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 200,
            boxSizing: "border-box",
            padding: 1,
          },
        }}
      >

      {/* Drawer Header with Close Button */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <IconButton onClick={toggleDrawer}>
            <ArrowBackIcon />
          </IconButton>
          <Typography level="h6" sx={{ marginLeft: "10px" }}>
            Menu
          </Typography>
        </div>
        <Divider />
        
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemText primary="Home" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/coins" onClick={toggleDrawer}>
            <ListItemText primary="All Coins" />
          </ListItem>
          <ListItem button component={Link} to="/news" onClick={toggleDrawer}>
            <ListItemText primary="All News" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default NavBar;
