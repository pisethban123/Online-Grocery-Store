import Layout from "../layouts/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import theme from "../theme/theme";
import CategoriesArea from "../components/categories";

const classes = {
  addToCartButton: {
    justifyContent: "center",
    height: 40,
    borderRadius: 5,
    border: 1,
    backgroundColor: theme.palette.primary.white,
    color: theme.palette.primary.main,
    "&:hover": {
      transition: "all 0.3s ease",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.white,
    },
  },
};

const Home = ({ cart, setCart, searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState({
    type: null,
    value: "",
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === product.productId
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.sort((a, b) => a.productId - b.productId));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const name = product.productName?.toLowerCase();
    const cat = product.category?.toLowerCase();
    const subcat = product.subcategory?.toLowerCase();
    const query = searchQuery.toLowerCase();
    const selected = selectedFilter.value?.toLowerCase();

    if (selectedFilter.type === "subcategory") {
      return subcat === selected;
    }

    if (selectedFilter.type === "category") {
      return cat === selected;
    }

    return name.includes(query);
  });

  const handleSubCategorySelect = ({ type, value }) => {
    setSelectedFilter({ type, value });
  };

  if (loading) return <CircularProgress />;

  return (
    <Layout
      cart={cart}
      setCart={setCart}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      <CategoriesArea onSubCategorySelect={handleSubCategorySelect} />
      <Box sx={{ flex: 1, mt: 5, ml: 3 }}>
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card
                sx={{
                  width: 320,
                  height: "100%",
                  borderRadius: 3,
                  border: 1,
                  borderColor: theme.palette.grey[300],
                }}
              >
                {product.imageUrl && (
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{ objectFit: "contain", padding: 3 }}
                  />
                )}
                <CardContent>
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {new Intl.NumberFormat("en-AU", {
                      style: "currency",
                      currency: "AUD",
                    }).format(product.unitPrice)}
                  </Typography>
                  <Typography variant="h5">{product.productName}</Typography>
                  <Typography variant="h4">{product.unitQuantity}</Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "center", px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      ...classes.addToCartButton,
                      borderColor:
                        product.stock === 0
                          ? "grey.300"
                          : theme.palette.primary.main,
                    }}
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Home;
