import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/navbar";
import CategoriesArea from "../components/categories";

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box maxWidth="xl" sx={{ mt: 12.5, mb: 2 }}>
        <CategoriesArea />
        <Box maxWidth="xl" sx={{ ml: 10, mr: 10 }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
