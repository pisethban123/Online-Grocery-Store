import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Alert,
  Grid,
} from "@mui/material";
import Layout from "../layouts/secondLayout";
import theme from "../theme/theme";
import { useNavigate } from "react-router-dom";
import delivery from "../assets/delivery.png";

const states = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT", "Others"];

const Delivery = ({ cart, onPlaceOrder, checkStock }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    street: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name) {
      newErrors.name = "This field is required";
    } else if (!form.name.match(/^[A-Za-z\s]+$/)) {
      newErrors.name = "Name can only contain alphabetical characters";
    }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email";
    if (!form.mobile.match(/^\d{10}$/))
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    if (!form.street) newErrors.street = "This field is required";
    if (!form.city) {
      newErrors.city = "This field is required";
    } else if (!form.city.match(/^[A-Za-z\s]+$/)) {
      newErrors.city = "City can only contain alphabetical characters";
    }
    if (!form.state) newErrors.state = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!validate()) return;
    const outOfStock = await checkStock(cart);
    if (outOfStock.length) {
      setSubmitError(`Unavailable: ${outOfStock.join(", ")}`);
      return;
    }
    onPlaceOrder(form);
  };

  return (
    <Layout>
      <Grid container sx={{ mt: 3, flexDirection: "row" }}>
        {/* Left: Form */}
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              maxWidth: "40vw",
              backgroundColor: theme.palette.primary.soft,
              p: 3,
              borderRadius: 5,
            }}
          >
            <Typography variant="h2" gutterBottom>
              Delivery details
            </Typography>
            {submitError && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {submitError}
              </Alert>
            )}
            {["name", "email", "mobile", "street"].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={form[field]}
                onChange={handleChange}
                error={!!errors[field]}
                helperText={errors[field] || " "}
                fullWidth
                margin="normal"
              />
            ))}
            <Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
              <TextField
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city || " "}
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                error={!!errors.state}
                helperText={errors.state || " "}
                fullWidth
                margin="normal"
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                sx={{ height: 40, flex: 1 }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ height: 40, flex: 1 }}
                onClick={handleSubmit}
              >
                Submit Order
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* Right: Image + Text */}
        <Grid item xs={0} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: "50vw",
            }}
          >
            <img
              src={delivery}
              alt="Delivery"
              style={{ maxWidth: "70%", height: "auto", mb: 10 }}
            />
            <Typography variant="h2" color={`${theme.palette.primary.main}`}>
              Groceries will be at your doorstep soon!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Delivery;
