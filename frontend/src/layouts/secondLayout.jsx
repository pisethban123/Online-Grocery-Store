import React from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import logo from "../assets/logo.png";

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minHeight: 100,
          ml: 10,
        }}
      >
        <img src={logo} alt="logo" style={{ width: "58px", height: "58px" }} />
        <Typography variant="h2">SwiftCart</Typography>
      </Box>
      <Box
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          p: 2,
          ml: 8,
          mb: 2,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
