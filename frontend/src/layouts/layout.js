import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/navbar";
import CategoriesArea from "../components/categories";
import Cart from "../components/cart";

const Layout = ({ children, cart, setCart }) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <CssBaseline />
      <Navbar cart={cart} toggleDrawer={toggleDrawer} />
      <Cart
        cart={cart}
        setCart={setCart}
        open={open}
        toggleDrawer={toggleDrawer}
      />
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
