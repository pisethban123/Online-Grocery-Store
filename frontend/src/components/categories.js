import React, { useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import theme from "../theme/theme";

const CategoriesArea = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        height: 80,
      }}
    >
      <Button
        endIcon={<ExpandMore />}
        onClick={handleMenuOpen}
        sx={{
          color: theme.palette.primary.white,
          textTransform: "none",
          fontSize: "1.2rem",
          mx: 9,
        }}
      >
        Browse categories
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Fruits & Vegetables</MenuItem>
        <MenuItem onClick={handleMenuClose}>Dairy</MenuItem>
        <MenuItem onClick={handleMenuClose}>Snacks</MenuItem>
      </Menu>
    </Box>
  );
};

export default CategoriesArea;
