import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
  Badge,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo.png";
import theme from "../theme/theme";

const classes = {
  searchBox: {
    display: "flex",
    alignItems: "center",
    px: 1.5,
    py: 0.5,
    ml: 4,
    border: 3,
    borderColor: "#f0f0f0",
    borderRadius: 3,
    height: 48,
    width: "80%",
    "&:focus-within": {
      borderColor: theme.palette.primary.main,
    },
  },
};

const Navbar = ({
  cart,
  setCart,
  toggleDrawer,
  searchQuery,
  setSearchQuery,
}) => {
  const totalItems = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <AppBar color="inherit" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: 80,
        }}
      >
        {/* Left side*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minHeight: 100,
            ml: 7,
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "58px", height: "58px" }}
          />
          <Typography variant="h2">SwiftCart</Typography>
        </Box>

        {/* Center */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            ml: 2,
            mr: 2,
          }}
        >
          <Box sx={classes.searchBox}>
            <SearchIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <InputBase
              fullWidth
              placeholder="Search product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <IconButton
                onClick={handleClear}
                sx={{ color: theme.palette.primary.main }}
              >
                <ClearIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 8 }}>
          <Badge
            badgeContent={totalItems}
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                border: "2px solid white", // White border
                fontSize: "14px",
                height: "28px",
                minWidth: "28px",
                borderRadius: "50%",
              },
            }}
          >
            <Button
              onClick={toggleDrawer}
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "none",
                color: theme.palette.primary.white,
                borderColor: theme.palette.primary.main,
              }}
            >
              <Typography sx={{ mr: 1, fontSize: 16 }}>Cart</Typography>

              <ShoppingCart sx={{ fontSize: 24 }} />
            </Button>
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
