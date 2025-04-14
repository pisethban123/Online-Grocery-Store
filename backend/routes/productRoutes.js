// productRoutes.js
import express from "express";
import {
  getAllProducts,
  addProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", addProduct);

export default router;
