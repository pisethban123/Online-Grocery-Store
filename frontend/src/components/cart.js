import React from "react";
import { Drawer, Box, Typography, IconButton, Button } from "@mui/material";
import { AddCircle, RemoveCircle, Delete, Close } from "@mui/icons-material";
import theme from "../theme/theme";

const Cart = ({ cart, setCart, open, toggleDrawer }) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <Box sx={{ width: 500, maxWidth: "100vw", height: "100vh" }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h2" gutterBottom>
            Shopping Cart
          </Typography>
          <IconButton
            onClick={() => toggleDrawer(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: theme.palette.primary.main,
            }}
          >
            <Close sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>

        {cart.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              height: "70vh", // Take up 70% of the height for centering
              textAlign: "center",
              backgroundColor: theme.palette.primary.soft,
            }}
          >
            <Typography variant="h3">Your cart is empty</Typography>
          </Box>
        ) : (
          <Box>
            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  p: 2,
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Typography variant="h6">{item.productName}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => decreaseQuantity(item.id)}>
                    <RemoveCircle />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton onClick={() => increaseQuantity(item.id)}>
                    <AddCircle />
                  </IconButton>
                </Box>
                <Typography variant="body1">
                  ${item.unitPrice * item.quantity}
                </Typography>
                <IconButton onClick={() => removeItem(item.id)}>
                  <Delete />
                </IconButton>
              </Box>
            ))}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: 1 }}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
