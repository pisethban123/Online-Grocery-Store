import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: false,
  },
  productName: {
    type: String,
    maxlength: 20,
    required: false,
  },
  unitPrice: {
    type: Number,
    required: false,
  },
  unitQuantity: {
    type: String,
    maxlength: 15,
    required: false,
  },
  stock: {
    type: Number,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false, // or true if every product must have one
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
