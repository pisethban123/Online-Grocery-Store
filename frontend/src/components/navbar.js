import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Badge,
} from "@mui/material";
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
    border: 2,
    borderColor: "#f0f0f0",
    borderRadius: 3,
    width: "80%",
    "&:focus-within": {
      backgroundColor: "#fff",
      boxShadow: "0 0 0 2px #FF7043",
    },
  },
};

const Navbar = ({ cart, toggleDrawer }) => {
  const totalItems = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

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
            <InputBase fullWidth placeholder="Search products" />
          </Box>
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 8 }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ color: theme.palette.primary.main }}
          >
            <Typography sx={{ mr: 1 }}>Cart</Typography>
            <Badge badgeContent={totalItems} color="primary">
              <ShoppingCart sx={{ fontSize: "large" }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
