export const checkCartStock = async (cart) => {
  try {
    const res = await fetch("http://localhost:5000/api/products");

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const latestProducts = await res.json();

    const insufficientStockItems = cart.filter((cartItem) => {
      const productInDB = latestProducts.find(
        (p) => p.productId === cartItem.productId
      );

      return !productInDB || productInDB.stock < cartItem.quantity;
    });

    return { insufficientStockItems, latestProducts };
  } catch (error) {
    console.error("Stock check error:", error);
    throw new Error("Stock check failed. Please try again later.");
  }
};
