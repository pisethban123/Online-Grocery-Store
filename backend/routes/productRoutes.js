// productRoutes.js
import express from "express";
import {
  getAllProducts,
  deductStock,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products/deductStock", deductStock);

export default router;
