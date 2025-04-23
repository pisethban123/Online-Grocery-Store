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

export const deductStock = async (req, res) => {
  const items = req.body.items;
  try {
    console.log("Items are:" + items);
    for (const item of items) {
      await Product.findOneAndUpdate(
        { productId: item.productId },
        { $inc: { stock: -item.quantity } }
      );
    }
    res.status(200).json({ message: "Stock updated successfully" });
    console.log("Stock updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating stock" });
  }
};
