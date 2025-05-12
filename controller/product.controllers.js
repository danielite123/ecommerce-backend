import Product from "../models/Product.js";
import User from "../models/User.js";

export const createProduct = async (req, res) => {
  const {
    name,
    brand,
    price,
    discount = 0,
    colors = [],
    category,
    stock,
    status,
    imageUrls,
    specifications,
    shippingOptions,
    warranty,
    installmentAvailable = false,
  } = req.body;

  const createdBy = req.user?.id;

  if (!name || name.length < 2) {
    return res.status(403).json({ error: "Product name is required" });
  }

  if (!category?.length || !brand?.length) {
    return res.status(403).json({ error: "Brand and category are required" });
  }

  if (!price || price < 0) {
    return res
      .status(403)
      .json({ error: "Product price must be a valid number" });
  }

  const finalPrice =
    discount > 0 ? Math.round(price * (1 - discount / 100)) : price;

  const installmentPlan = installmentAvailable
    ? {
        total: finalPrice,
        payments: 3,
        perPayment: Math.round(finalPrice / 3),
      }
    : null;

  let product = new Product({
    name,
    category,
    brand,
    price: finalPrice,
    colors,
    stock,
    status,
    imageUrls,
    specifications,
    shippingOptions,
    warranty,
    installmentPlan,
    createdBy,
  });

  product
    .save()
    .then(async (p) => {
      if (createdBy) {
        await User.findByIdAndUpdate(createdBy, {
          $push: { products: p._id },
        });
      }

      return res.status(200).json({ id: p._id });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};

export const getUserProducts = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(403).json({
      success: false,
      error: "Authentication required",
    });
  }

  try {
    const products = await Product.find({ createdBy: userId }).select(
      "name brand price discount category stock status imageUrls"
    );

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error: " + err.message,
    });
  }
};
