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

  const handleToggle = (category) => {
    setOpenCategories((prev) => {
      const isCurrentlyOpen = !!prev[category];
      return isCurrentlyOpen ? {} : { [category]: true };
    });
  };

  const handleSubCategoryClick = (value, isCategory = false) => {
    onSubCategorySelect({
      type: isCategory ? "category" : "subcategory",
      value,
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
        height: "100vh",
        backgroundColor: theme.palette.primary.main,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        width: 320,
        p: "1 1 1 0",
        my: 5,
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
        {Object.entries(categoryMap).map(([category, subcategories]) => (
          <Box key={category}>
            <ListItemButton
              onClick={() => {
                if (categoryMap[category].length > 0) {
                  handleToggle(category); // Toggle subcategories
                } else {
                  handleSubCategoryClick(category, true); // Filter by category directly
                }
              }}
            >
              <ListItemText
                primary={category}
                slotProps={{
                  primary: {
                    sx: {
                      color: "white",
                      fontSize: 20,
                    },
                  },
                }}
              />
              {categoryMap[category] &&
                categoryMap[category]?.length > 0 &&
                (openCategories[category] ? (
                  <ExpandLess sx={{ color: "white" }} />
                ) : (
                  <ExpandMore sx={{ color: "white" }} />
                ))}
            </ListItemButton>

            <Collapse
              in={openCategories[category]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {subcategories.length > 0 && (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => handleSubCategoryClick(category, true)}
                  >
                    <ListItemText
                      primary={`All ${category}`}
                      sx={{ color: "white" }}
                    />
                  </ListItemButton>
                )}

                {subcategories.map((sub) => (
                  <ListItemButton
                    key={sub}
                    sx={{ pl: 4 }}
                    onClick={() => handleSubCategoryClick(sub)}
                  >
                    <ListItemText primary={sub} sx={{ color: "white" }} />
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
