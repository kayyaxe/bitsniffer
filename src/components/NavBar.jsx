import React from "react";
import { Drawer, List, ListItem, Divider, Typography } from "@mui/joy";
import { ListItemText } from "@mui/material"; // Import from MUI material
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton"; // Import IconButton from MUI Joy
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import back arrow
import { Link } from "react-router-dom"; // Import Link for routing
import { styled, useTheme } from "@mui/material/styles";

function NavBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
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
          <ListItem component={Link} to="/" onClick={toggleDrawer}>
            <ListItemText primary="Home" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/coins" onClick={toggleDrawer}>
            <ListItemText primary="All Coins" />
          </ListItem>
          <ListItem component={Link} to="/news" onClick={toggleDrawer}>
            <ListItemText primary="All News" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default NavBar;
