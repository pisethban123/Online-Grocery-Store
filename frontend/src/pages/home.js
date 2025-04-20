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
} from "@mui/material";
import theme from "../theme/theme";

const classes = {
  addToCartButton: {
    justifyContent: "center",
    borderRadius: 5,
    border: 1,
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.white,
    color: theme.palette.primary.main,
    "&:hover": {
      transition: "all 0.3s ease",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.white,
    },
  },
};

const Home = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
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
        const sortedProducts = res.data.sort(
          (a, b) => a.productId - b.productId
        );
        setProducts(res.data);
        console.log(products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Layout cart={cart}>
      <Typography variant="h2" gutterBottom sx={{ my: 5 }}>
        Products
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={product._id}>
            <Card sx={{ width: 322, height: "100%" }}>
              {product.imageUrl && (
                <CardMedia
                  component="img"
                  height="300"
                  image={product.imageUrl}
                  alt={product.name}
                  sx={{ objectFit: "contain" }}
                />
              )}
              <CardContent>
                <Typography variant="h3">{product.productName}</Typography>
                <Typography variant="h4">{product.unitQuantity}</Typography>
                <Typography variant="body">${product.unitPrice}</Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "center", px: 2, pb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  sx={classes.addToCartButton}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Home;
