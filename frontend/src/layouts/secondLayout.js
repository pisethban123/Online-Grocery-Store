import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/navbar";

const Layout = ({ cart, children }) => {
  return (
    <>
      <CssBaseline />
      <Navbar cart={cart} />
      <Box maxWidth="xl" sx={{ mt: 12.5, mb: 2, ml: 10, mr: 10 }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
