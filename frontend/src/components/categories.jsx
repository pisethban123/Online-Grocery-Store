import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import theme from "../theme/theme";

const CategoriesArea = ({ onSubCategorySelect }) => {
  const [categoryMap, setCategoryMap] = useState({});
  const [openCategories, setOpenCategories] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  const handleToggle = (category) => {
    setOpenCategories((prev) => {
      const isCurrentlyOpen = !!prev[category];
      return isCurrentlyOpen ? {} : { [category]: true };
    });
  };

  const handleCategoryClick = (category) => {
    const isAlreadyOpen = openCategories[category];

    if (isAlreadyOpen) {
      setOpenCategories({});
      setActiveCategory(null);
      setActiveSubCategory(null);
    } else {
      setOpenCategories({ [category]: true });
      setActiveCategory(category);
      setActiveSubCategory(null);
      onSubCategorySelect({
        type: "category",
        value: category,
      });
    }
  };

  const handleSubCategoryClick = (subcategory) => {
    // Set active subcategory
    setActiveSubCategory(subcategory);
    onSubCategorySelect({
      type: "subcategory",
      value: subcategory,
    });
  };

  const handleViewAllProducts = () => {
    // Set "All Products" as active and reset subcategory
    setActiveCategory("All Products");
    setActiveSubCategory(null);
    setOpenCategories({});
    onSubCategorySelect({
      type: "allProducts",
      value: "All Products",
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const products = res.data;

        const map = {};
        products.forEach((item) => {
          if (!map[item.category]) {
            map[item.category] = new Set();
          }
          if (item.subcategory) {
            map[item.category].add(item.subcategory);
          }
        });

        const formattedMap = {};
        Object.keys(map)
          .sort()
          .forEach((cat) => {
            formattedMap[cat] = Array.from(map[cat]).sort();
          });

        setCategoryMap(formattedMap);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        width: 320,
        p: "1 1 1 0",
        mt: 5,
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: "white", p: 2, flexShrink: 0 }}
        gutterBottom
      >
        Categories
      </Typography>

      <List>
        {/* "All Products" Button */}
        <ListItemButton
          onClick={handleViewAllProducts}
          sx={{
            backgroundColor:
              activeCategory === "All Products"
                ? "rgba(255, 255, 255, 0.3)"
                : "transparent",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          <ListItemText
            primary="All Products"
            slotProps={{
              primary: {
                sx: {
                  color: "white",
                  fontSize: 20,
                  fontWeight: activeCategory === "All Products" ? 600 : 400,
                },
              },
            }}
          />
        </ListItemButton>

        {Object.entries(categoryMap).map(([category, subcategories]) => (
          <Box key={category}>
            {/* Category Button */}
            <ListItemButton
              onClick={() => {
                handleToggle(category);
                handleCategoryClick(category);
              }}
              sx={{
                backgroundColor:
                  activeCategory === category
                    ? "rgba(255, 255, 255, 0.3)"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <ListItemText
                primary={category}
                slotProps={{
                  primary: {
                    sx: {
                      color: "white",
                      fontSize: 20,
                      fontWeight: activeCategory === category ? 600 : 400,
                    },
                  },
                }}
              />
              {categoryMap[category]?.length > 0 &&
                (openCategories[category] ? (
                  <ExpandLess sx={{ color: "white" }} />
                ) : (
                  <ExpandMore sx={{ color: "white" }} />
                ))}
            </ListItemButton>

            {/* Category Collapse */}
            <Collapse
              in={openCategories[category]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {/* "All <Category>" Subcategory */}
                {subcategories.length > 0 && (
                  <ListItemButton
                    sx={{
                      pl: 4,
                      backgroundColor:
                        activeCategory === category && !activeSubCategory
                          ? "rgba(255, 255, 255, 0.3)"
                          : "transparent",
                      borderTop: "1px solid rgba(255, 255, 255, 0.8)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <ListItemText
                      primary={`All ${category}`}
                      sx={{
                        color: "white",
                        fontSize: 16,
                        fontWeight:
                          activeSubCategory === `All ${category}` ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                )}

                {/* Subcategories */}
                {subcategories.map((sub) => (
                  <ListItemButton
                    key={sub}
                    sx={{
                      pl: 4,
                      backgroundColor:
                        activeSubCategory === sub
                          ? "rgba(255, 255, 255, 0.3)"
                          : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                    onClick={() => handleSubCategoryClick(sub)}
                  >
                    <ListItemText
                      primary={sub}
                      sx={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: activeSubCategory === sub ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default CategoriesArea;
