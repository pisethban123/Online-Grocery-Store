import React, { useEffect, useState } from "react";
import { Drawer, Box, Typography, IconButton, Button } from "@mui/material";
import { AddCircle, RemoveCircle, Close } from "@mui/icons-material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import theme from "../theme/theme";
import { useNavigate } from "react-router-dom";
import { checkCartStock } from "../utils/checkStock";
import AlertDialog from "./alert";

const Cart = ({ cart, setCart, open, toggleDrawer, products }) => {
  const navigate = useNavigate();
  const isEmpty = cart.length === 0;
  const [alertData, setAlertData] = useState({
    open: false,
    severity: "",
    title: "",
    message: "",
    confirmText: "",
  });
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
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeItem = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart && JSON.parse(storedCart).length > 0) {
      setCart(JSON.parse(storedCart));
      toggleDrawer(true);
    }
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const { insufficientStockItems } = await checkCartStock(cart);

      if (insufficientStockItems.length > 0) {
        const updatedCart = cart.filter(
          (cartItem) =>
            !insufficientStockItems.some(
              (outItem) => outItem.productId === cartItem.productId
            )
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setAlertData({
          open: true,
          severity: "error",
          title: "Insufficient Stock",
          message: "Some items were removed from your cart due to low stock",
          confirmText: "GO BACK",
        });
      } else {
        navigate("/delivery");
      }
    } catch (error) {
      console.error("Error checking stock before placing order:", error);
      alert("Error verifying stock. Please try again later.");
    }
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

        {isEmpty ? (
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
              {cart.map((item) => {
                const product = products.find(
                  (p) => p.productId === item.productId
                );
                const stockLimitReached =
                  product && item.quantity >= product.stock;

                return (
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton
                          onClick={() => decreaseQuantity(item.productId)}
                        >
                          <RemoveCircle
                            sx={{ color: theme.palette.primary.main }}
                          />
                        </IconButton>
                        <Typography sx={{ width: 10, textAlign: "center" }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => increaseQuantity(item.productId)}
                          disabled={stockLimitReached}
                        >
                          <AddCircle
                            sx={{
                              color: stockLimitReached
                                ? theme.palette.grey[400]
                                : theme.palette.primary.main,
                            }}
                          />
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
                );
              })}
            </Box>
          </>
        )}
        <Box
          sx={{
            position: "sticky",
            backgroundColor: "#fff",
            px: 3,
            py: 2,
            borderTop: "3px solid #ddd",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<DeleteSweepIcon />}
              onClick={clearCart}
              disabled={isEmpty}
              sx={{ flex: "0 0 40%" }}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePlaceOrder}
              disabled={isEmpty}
              sx={{ flex: "0 0 60%", p: 1 }}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      </Box>
      <AlertDialog
        open={alertData.open}
        onClose={() => setAlertData((prev) => ({ ...prev, open: false }))}
        title={alertData.title}
        message={alertData.message}
        severity={alertData.severity}
        confirmText={alertData.confirmText}
        onConfirm={() => {
          setAlertData({ ...alertData, open: false });
        }}
      />
    </Drawer>
  );
};

export default Cart;
