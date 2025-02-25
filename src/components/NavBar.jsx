import React from "react";
import { Drawer, List, ListItem, Divider, Typography } from "@mui/joy";
import { ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArticleIcon from "@mui/icons-material/Article";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* White Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          flexShrink: 0,
          width: open ? 100 : 56, // Set width here

          "& .MuiDrawer-paper": {
            overflow: "hidden", // Prevent extra spacing
            boxSizing: "border-box",
            padding: 1,
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {/* Drawer Header with Close Button */}
        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <IconButton onClick={toggleDrawer} sx={{ color: "#000" }}>
            <ArrowBackIcon />
          </IconButton>
          {open && (
            <Typography level="h6" sx={{ marginLeft: "10px", color: "#000" }}>
              Menu
            </Typography>
          )}
        </div>
        <Divider />

        <List>
          <ListItem
            component={Link}
            to="/"
            onClick={toggleDrawer}
            sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
          >
            {open ? (
              <ListItemText primary="Home" sx={{ color: "#000" }} />
            ) : (
              <HomeIcon sx={{ color: "#000" }} />
            )}
          </ListItem>
          <Divider />
          <ListItem
            component={Link}
            to="/coins"
            onClick={toggleDrawer}
            sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
          >
            {open ? (
              <ListItemText primary="All Coins" sx={{ color: "#000" }} />
            ) : (
              <MonetizationOnIcon sx={{ color: "#000" }} />
            )}
          </ListItem>
          <Divider />
          <ListItem
            component={Link}
            to="/news"
            onClick={toggleDrawer}
            sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
          >
            {open ? (
              <ListItemText primary="All News" sx={{ color: "#000" }} />
            ) : (
              <ArticleIcon sx={{ color: "#000" }} />
            )}
          </ListItem>
        </List>

        {/* Social Links Section */}
        <Divider sx={{ marginTop: "auto" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "3px",
          }}
        >
          <ListItem
            component="a"
            href="https://github.com/kayyaxe"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleDrawer}
            sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
          >
            <GitHubIcon sx={{ color: "#000" }} />
            {open && <ListItemText primary="GitHub" sx={{ color: "#000" }} />}
          </ListItem>
          <Divider />
          <ListItem
            component="a"
            href="https://www.linkedin.com/in/karxuan/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleDrawer}
            sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
          >
            <LinkedInIcon sx={{ color: "#000" }} />
            {open && <ListItemText primary="LinkedIn" sx={{ color: "#000" }} />}
          </ListItem>
        </div>
      </Drawer>
    </>
  );
}

export default NavBar;
