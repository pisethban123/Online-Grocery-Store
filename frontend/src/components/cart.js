import React from "react";
import { Drawer, Box, Typography, IconButton, Button } from "@mui/material";
import { AddCircle, RemoveCircle, Close } from "@mui/icons-material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import theme from "../theme/theme";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart, open, toggleDrawer }) => {
  const navigate = useNavigate();
  const totalPrice = cart.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <Box
        sx={{
          width: "30vw",
          maxWidth: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            backgroundColor: theme.palette.primary.white,
            px: 3,
            py: 2,
            borderBottom: "3px solid #ddd",
          }}
        >
          <Typography variant="h2">Shopping Cart</Typography>
          <IconButton
            onClick={() => toggleDrawer(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: theme.palette.primary.main,
            }}
          >
            <Close sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>

        {cart.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: theme.palette.primary.white,
            }}
          >
            <Typography variant="h3">Your cart is empty</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                px: 3,
                pt: 2,
                backgroundColor: theme.palette.primary.white,
              }}
            >
              {cart.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    pb: 2,
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.productName}
                    sx={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      borderRadius: 1,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="h6">{item.productName}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => decreaseQuantity(item.productId)}
                      >
                        <RemoveCircle sx={{ color: theme.palette.grey[400] }} />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        onClick={() => increaseQuantity(item.productId)}
                      >
                        <AddCircle sx={{ color: theme.palette.grey[400] }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      ml: 2,
                      mt: -4,
                      minWidth: 100,
                      height: 64,
                    }}
                  >
                    <IconButton
                      sx={{
                        mb: 2,
                        bgcolor: theme.palette.grey[100],
                        "&:hover": {
                          bgcolor: theme.palette.grey[200],
                        },
                      }}
                      onClick={() => removeItem(item.productId)}
                    >
                      <Close sx={{ fontSize: 16 }} />
                    </IconButton>
                    <Typography variant="h6" sx={{ pr: 1 }}>
                      ${item.unitPrice * item.quantity}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                position: "sticky",
                backgroundColor: "#fff",
                px: 3,
                py: 2,
                borderTop: "3px solid #ddd",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DeleteSweepIcon />}
                  onClick={clearCart}
                  sx={{ flex: "0 0 40%" }}
                >
                  Clear Cart
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ flex: "0 0 60%", p: 1 }}
                  onClick={() => navigate("/delivery")}
                >
                  Place Order
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
