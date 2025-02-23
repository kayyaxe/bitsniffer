import React from "react";
import { Drawer, List, ListItem, Divider, Typography } from "@mui/joy";
import { ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home"; // Import icons
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // Icon for All Coins
import ArticleIcon from "@mui/icons-material/Article"; // Icon for All News

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

      {/* Mini Variant Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: 200,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 200 : 56, // Change width based on open state
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
          {open && ( // Show title only if open
            <Typography level="h6" sx={{ marginLeft: "10px" }}>
              Menu
            </Typography>
          )}
        </div>
        <Divider />

        <List>
          <ListItem component={Link} to="/" onClick={toggleDrawer}>
            {open ? <ListItemText primary="Home" /> : <HomeIcon />}
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/coins" onClick={toggleDrawer}>
            {open ? (
              <ListItemText primary="All Coins" />
            ) : (
              <MonetizationOnIcon />
            )}
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/news" onClick={toggleDrawer}>
            {open ? <ListItemText primary="All News" /> : <ArticleIcon />}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default NavBar;
