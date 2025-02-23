import React from "react";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 2,
        mt: "auto",
        color: "white",
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Chen Kar Xuan. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
