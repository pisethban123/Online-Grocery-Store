import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/navbar";
import Cart from "../components/cart";

const Layout = ({
  children,
  cart,
  setCart,
  searchQuery,
  setSearchQuery,
  products,
}) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <Navbar
        cart={cart}
        setCart={setCart}
        toggleDrawer={toggleDrawer}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        products={products}
      />
      <Cart
        cart={cart}
        setCart={setCart}
        open={open}
        toggleDrawer={toggleDrawer}
        products={products}
      />
      <Box
        maxWidth="xl"
        sx={{ mt: 12.5, mb: 5, ml: 10, mr: 10, display: "flex" }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
