// productRoutes.js
import express from "express";
import {
  getAllProducts,
  searchProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/search", searchProduct);

export default router;
