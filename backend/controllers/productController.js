import Product from "../models/productModel.js";

// Fetch all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//search product
export const searchProduct = async (req, res) => {
  const { query } = req.query;

  try {
    const products = await Product.find({
      productName: { $regex: query, $options: "i" },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
